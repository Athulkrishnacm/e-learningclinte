import React, { useEffect, useRef, useState } from "react";
import Chat from "../Chat/Chat";
import Message from "../Message/Message";
import Conversation from "../Conversation/Conversation";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { io } from "socket.io-client";
import "./Messenger.css";
import { useMediaQuery } from "react-responsive";
//import GroupInfo from '../GroupInfo/GroupInfo';
import SendImageModal from "../SendImageModal/SendImageModal";
import { IoImage, IoVideocam } from "react-icons/io5";
import {
  getMessages,
  getjoinedGroups,
  sendImage,
  sendMessage,
} from "../../../../Services/userApi";
import jwtDecode from "jwt-decode";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { ReactMediaRecorder } from "react-media-recorder";
import {
  handleImage,
  imageUpload,
  videoValidation,
} from "../../../../constants/constant";
import { useLocation } from "react-router-dom";

function Messenger() {
  const [userGroups, setUserGroups] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const socket = useRef();
  const [showMessagesDiv, setshowMessagesDiv] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [searchTerm, setSearchTerm] = useState("");
  const [showAbout, setShowAbout] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);
  const [user, setUser] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const location = useLocation();
  
  //connecting to socket
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BaseURL);
  }, [user]);

  //Join the appropriate room for the current group
  const handleConversation = (group) => {
    setCurrentChat(group);
    socket.current.emit("joinGroup", group._id);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      var decodedToken = jwtDecode(token);
    }
    setUser({ id: decodedToken.userId });
    if(location.state){
    const { group } = location.state;
    handleConversation(group)
    }
  }, []);

  // //receive message and disconnect
  useEffect(() => {
    //receive message
    socket.current.on("receiveMessage", ({ sender, text, type, file }) => {
      if (sender._id != user.id) {
        setMessages((messages) => [...messages, { sender, text, type, file }]);
      }
    });
    // Clean up when the component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, [user]);

  //loading groups
  useEffect(() => {
    getjoinedGroups().then(({ data }) => {
      setUserGroups(data.groups);
    });
  }, []);

  // //get messages
  useEffect(() => {
    if (currentChat) {
      getMessages(currentChat?._id)
        .then((response) => {
          setMessages(response.data.messages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentChat]);

  // //send new message
  const handleSubmit = () => {
    if (newMessage != "") {
      const message = {
        text: newMessage,
        group: currentChat._id,
        sender: { _id: user.id },
      };
      sendMessage(message)
        .then(({ data }) => {
          //sending message to socketio
          socket.current.emit("sendMessage", {
            userId: user.id,
            groupId: currentChat._id,
            text: newMessage,
          });
          //update messages
          setMessages([...messages, data]);
          setNewMessage("");
          setShowEmojiPicker(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const voiceSend = async (blobUrl) => {
    const audioBlob = await fetch(blobUrl).then((response) => response.blob());
    const message = {
      type: "voice",
      group: currentChat._id,
      sender: { _id: user.id },
    };
    const voiceUrl = await imageUpload("/msg-audios/", audioBlob);
    message.file = voiceUrl;
    sendImage(message)
      .then((response) => {
        socket.current.emit("sendFile", response.data);
        setMessages([...messages, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // //scrolling when new message load
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentChat, showEmojiPicker]);

  // //submit data when user click enter
  const keyDownHandler = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      // ️ call submit function here
      handleSubmit();
    }
  };

  return (
    <div className="h-screen w-full flex antialiased text-black bg-white overflow-hidden">
      <div className="flex-1 flex flex-col">
        <main className="flex-grow border-t flex flex-row min-h-0">
          {showMessagesDiv ? (
            <section className="z-50 flex flex-col flex-none overflow-auto w-screen group border-r border-l border-[#dee2e7] lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
              <div className="search-box border-b border-[#dee2e7] p-4 flex-none">
                <form>
                  <div className="relative">
                    <label>
                      <input
                        className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-100 focus:border-gray-100 bg-gray-100 focus:bg-gray-100 focus:outline-none text-gray-800 focus:shadow-md transition duration-300 ease-in"
                        type="text"
                        placeholder="Search Groups"
                        onChange={(event) => {
                          setSearchTerm(event.target.value);
                        }}
                      />
                      <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                        <svg viewBox="0 0 24 24" className="w-6 h-6">
                          <path
                            fill="#bbb"
                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                          />
                        </svg>
                      </span>
                    </label>
                  </div>
                </form>
              </div>
              {userGroups?.length ? (
                <div className="contacts flex-1 overflow-y-scroll">
                  {userGroups &&
                    userGroups.map((group, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          handleConversation(group);
                          setShowAbout(false);
                        }}>
                        <Conversation
                          isMobile={isMobile}
                          setshowMessagesDiv={setshowMessagesDiv}
                          group={group}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  No Joined Groups.
                </div>
              )}
            </section>
          ) : (
            ""
          )}
          {currentChat ? (
            <>
              {showAbout ? null : (
                // <GroupInfo setShowAbout={setShowAbout} currentChat={currentChat} groupData={groupData} setCurrentChat={setCurrentChat} />
                <section className="flex flex-col flex-auto pb-12 sm:pb-0">
                  <Chat
                    isMobile={isMobile}
                    setShowAbout={setShowAbout}
                    setshowMessagesDiv={setshowMessagesDiv}
                    currentChat={currentChat}
                  />
                  <div className=" chat-body p-4 flex-1 overflow-y-scroll">
                    {currentChat && (
                      <div className="relative">
                        {messages.length >= 1 ? (
                          messages.map((message, index) => (
                            <div key={index}>
                              <Message
                                message={message}
                                currentChat={currentChat}
                                own={user.id === message.sender?._id}
                                user={user}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="w-full flex justify-center items-center">
                            No messages found
                          </div>
                        )}
                        {showEmojiPicker && (
                          <div className="absolute bottom-0 left-0 ">
                            <div className="emoji-picker-container">
                              <div className="emoji-picker-header flex justify-end">
                                <button
                                  className="emoji-picker-close"
                                  onClick={() => setShowEmojiPicker(false)}>
                                  <FiX />
                                </button>
                              </div>
                              <EmojiPicker
                                onEmojiClick={(emoji) =>
                                  setNewMessage(
                                    (prevMessage) => prevMessage + emoji.emoji
                                  )
                                }
                                searchDisabled={true}
                                emojiStyle={EmojiStyle.APPLE}
                                previewConfig={{ showPreview: false }}
                                height={300}
                                width={300}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div ref={scrollRef}></div>
                  </div>

                  <div className="chat-footer border-t flex-none">
                    <div className="flex flex-row items-center p-4">
                      {mediaFile ? (
                        <SendImageModal
                          mediaFile={mediaFile}
                          setmediaFile={setMediaFile}
                          socket={socket.current}
                          group={currentChat}
                          user={user}
                          setMessages={setMessages}
                        />
                      ) : (
                        ""
                      )}
                      <button
                        type="button"
                        className="flex flex-shrink-0 focus:outline-none mx-2  text-blue-600 hover:text-blue-700 w-6 h-6">
                        <div className=" text-xs absolute   font-bold  rounded-full w-10 h-10  text-white flex justify-center items-center   float-left   overflow-hidden cursor-pointer">
                          <input
                            type="file"
                            name="photo"
                            className="absolute inset-0  opacity-0 cursor-pointer"
                            onChange={(e) => setMediaFile(handleImage(e))}
                          />
                        </div>
                        <IoImage size={22} />
                      </button>
                      <button
                        type="button"
                        className="flex flex-shrink-0 focus:outline-none mx-2  text-blue-600 hover:text-blue-700 w-6 h-6">
                        <div className=" text-xs absolute   font-bold  rounded-full w-10 h-10  text-white flex justify-center items-center   float-left   overflow-hidden cursor-pointer">
                          <input
                            type="file"
                            name="video"
                            className="absolute inset-0  opacity-0 cursor-pointer"
                            onChange={(e) => setMediaFile(videoValidation(e))}
                          />
                        </div>
                        <IoVideocam size={22} />
                      </button>
                      <div className="relative flex-grow">
                        <label>
                          <input
                            className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-100 focus:border-gray-100 bg-gray-100 focus:bg-gray-100 focus:outline-none text-black focus:shadow-md transition duration-300 ease-in"
                            type="text"
                            value={newMessage}
                            placeholder="Message"
                            onChange={(e) => {
                              setNewMessage(e.target.value);
                            }}
                            onKeyDown={keyDownHandler}
                          />
                          {isRecording ? (
                            <div class="absolute top-0 right-0 mt-2 mr-4 recording-div">
                              <div class="recording-circle"></div>
                              <div class="recording-text">Recording</div>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                setShowEmojiPicker(!showEmojiPicker)
                              }
                              type="button"
                              className="absolute top-0 right-0 mt-2 mr-4 flex flex-shrink-0 focus:outline-none  text-blue-600 hover:text-blue-700 w-6 h-6">
                              <BsEmojiSmile size={23} />
                            </button>
                          )}
                        </label>
                      </div>
                      {newMessage ? (
                        <button
                          onClick={handleSubmit}
                          type="button"
                          className="flex flex-shrink-0 focus:outline-none mx-2 h-9 w-9 bg-blue-600 text-white justify-center items-center rounded-full">
                          <IoSend size={20} />
                        </button>
                      ) : (
                        <ReactMediaRecorder
                          audio
                          render={({
                            status,
                            startRecording,
                            stopRecording,
                            mediaBlobUrl,
                          }) => (
                            <div>
                              {status === "recording" ? (
                                <button
                                  onClick={stopRecording}
                                  type="button"
                                  className="flex flex-shrink-0 focus:outline-none mx-2 h-9 w-9 bg-blue-600 text-white justify-center items-center rounded-full">
                                  <IoSend size={20} />
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    startRecording();
                                    setIsRecording(true);
                                  }}
                                  type="button"
                                  className="flex flex-shrink-0 focus:outline-none mx-2 h-9 w-9 bg-blue-600 text-white justify-center items-center rounded-full">
                                  <FaMicrophone size={20} />
                                </button>
                              )}
                            </div>
                          )}
                          onStop={(mediaBlobUrl) => {
                            voiceSend(mediaBlobUrl);
                            setIsRecording(false);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="w-full flex justify-center items-center">
              No conversation selected.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Messenger;
