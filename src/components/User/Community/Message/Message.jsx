import React, { useState } from "react";
import TimeAgo from "timeago-react";
import { MdClose } from "react-icons/md";

function Message({ own, message, user }) {
  const [showPreview, setShowPreview] = useState(false);
  let mediaElement = null;
  if (message.type === "image") {
    mediaElement = (
      <img
        onClick={() => setShowPreview(!showPreview)}
        className="w-full max-w-[224px] h-full rounded-lg object-cover"
        src={message.file}
        alt="image"
      />
    );
  } else if (message.type === "video") {
    mediaElement = (
      <video
        className="w-full max-w-[224px] h-full rounded-lg object-cover"
        src={message.file}
        controls
      />
    );
  } else if (message.type === "voice") {
    mediaElement = (
      <audio id="song" className="block w-60 sm:w-72  mx-auto" controls>
        <source src={message.file} type="audio/mpeg" />
      </audio>
    );
  }
  return (
    <>
      {own ? (
        <>
          {message.type === "image" ||
          message.type === "video" ||
          message.type === "voice" ? (
            <div className="flex flex-row justify-end mt-3">
              <div className="messages text-sm text-white grid grid-flow-row">
                <div className="flex items-center flex-row-reverse group">
                  <div className="p-2  rounded-l-xl rounded-br-xl bg-blue-500 max-w-xs lg:max-w-md">
                    <div className="flex items-center flex-row-reverse group">
                      {mediaElement}
                    </div>
                    {message.text ? (
                      <p className="mt-2 text-white ml-2">{message.text}</p>
                    ) : null}
                  </div>
                </div>
                <time className="text-right text-black text-[10px] opacity-50 ">
                  <TimeAgo datetime={message.createdAt} />
                </time>
              </div>

              <div className="w-8 h-8 relative flex flex-shrink-0 ml-2">
                <img
                  className=" rounded-full w-full h-full object-cover"
                  src={
                    message.sender?.image
                      ? message.sender.image
                      : "./assets/tutor/default-dp.png"
                  }
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-end mt-3">
              <div className="messages text-sm text-white grid grid-flow-row">
                <div className="flex items-center flex-row-reverse group">
                  <p className="px-6 py-3 rounded-b-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">
                    <span>{message.text}</span>
                  </p>
                </div>
                <time className="text-right text-black text-[10px] opacity-50 ">
                  <TimeAgo datetime={message.createdAt} />
                </time>
              </div>
              <div className="w-8 h-8 relative flex flex-shrink-0 ml-2">
                <img
                  className=" rounded-full w-full h-full object-cover"
                  src={
                    message.sender?.image
                      ? message.sender?.image
                      : "./assets/tutor/default-dp.png"
                  }
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* <p className="p-4 text-center text-sm text-gray-500">SAT 2:10 PM</p> */}

          {message.type === "image" ||
          message.type === "video" ||
          message.type === "voice" ? (
            <div className="flex flex-row justify-start mt-3">
              <div className="w-8 h-8 relative flex flex-shrink-0 mr-2">
                <img
                  className=" rounded-full w-full h-full object-cover"
                  src={
                    message.sender?.image
                      ? message.sender?.image
                      : "./assets/tutor/default-dp.png"
                  }
                />
              </div>

              <div className="messages text-sm text-white grid grid-flow-row">
                <div className="flex items-center flex-row-reverse group">
                  <div className="p-2  rounded-r-xl rounded-bl-xl bg-gray-200 max-w-xs lg:max-w-md">
                    <p className="text-xs text-blue-600 font-semibold text-left mb-2">
                      {message.sender?.name}
                    </p>
                    <div className="flex items-center flex-row-reverse group">
                      {mediaElement}
                    </div>
                    {message.text ? (
                      <p className="mt-2 text-black ml-2">{message.text}</p>
                    ) : null}
                  </div>
                </div>
                <time className="text-right flex text-black text-[10px] opacity-50 ">
                  <TimeAgo datetime={message.createdAt} />
                </time>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-start mt-3">
              <div className="w-8 h-8 relative flex flex-shrink-0 mr-2">
                <img
                  className=" rounded-full w-full h-full object-cover"
                  src={
                    message.sender?.image
                      ? message.sender?.image
                      : "./assets/tutor/default-dp.png"
                  }
                />
              </div>

              <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                <div className="flex items-center group">
                  <div className="px-6  py-1 rounded-t-full rounded-r-full bg-gray-100 max-w-xs lg:max-w-md text-gray-800">
                    <p className="text-xs text-blue-600 font-semibold text-left">
                      {message.sender?.name}
                    </p>
                    <span className="mt-3">{message.text}</span>
                  </div>
                </div>
                <time className="text-black flex  text-[10px] opacity-50 ">
                  <TimeAgo datetime={message.createdAt} />
                </time>
              </div>
            </div>
          )}
        </>
      )}
      {showPreview && (
        <div className="fixed top-0 left-0 z-50 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setShowPreview(false)}
              aria-label="Close">
              <MdClose className="h-6 w-6" color="white" />
            </button>
            <div className=" max-w-3xl max-h-3xl">
              <img
                src={message.file}
                className="object-contain"
                alt="certificate preview"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
