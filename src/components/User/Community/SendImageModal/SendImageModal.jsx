import React, { useEffect, useState } from "react";
//import { sendImage } from '../../services/userApi';
import { toast } from "react-hot-toast";
import { sendImage } from "../../../../Services/userApi";
import { imageUpload } from "../../../../constants/constant";

function SendImageModal({mediaFile,setmediaFile,group,socket,setMessages,}) {
  const [caption, setCaption] = useState();
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  useEffect(() => {
    if (mediaFile) {
      const fileType = mediaFile.type;
      if (fileType.includes("image")) {
        setImage(mediaFile);
      } else if (fileType.includes("video")) {
        setVideo(mediaFile);
      }
    }
  }, []);
  const handleSubmit = async () => {
    toast.loading("sending image");
    let message = {
      text: caption,
      group: group._id,
      type:null,
      file: null,
    };
    if (image) {
      message.file = await imageUpload("/msg-images/", image);
      message.type = "image"
    }
    if (video) {
      message.file = await imageUpload("/msg-videos/", video);
      message.type = "video"
    }

    sendImage(message)
      .then((response) => {
        socket.emit("sendFile", response.data);
        setMessages((prev) => [...prev, response.data]);
        setmediaFile(false);
        toast.dismiss();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div
        style={{ backgroundColor: "rgb(136 139 147 / 45%)" }}
        className="fixed flex    justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 ">
                Send an Image
              </h3>
              <div className="flex items-center justify-center w-full cursor-pointer ">
                {image && (
                  <img
                    className=" max-w-lg rounded-lg w-full course-image h-52 object-contain "
                    src={URL.createObjectURL(image)}
                    alt="image description"></img>
                )}
                {video && (
                  <video className="max-w-lg rounded-lg w-full" controls>
                    <source src={URL.createObjectURL(video)} type="video/mp4" />
                  </video>
                )}
              </div>
              <div>
                <label
                  htmlFor="caption"
                  className="block mb-2 text-sm font-medium text-gray-900 e">
                  Caption
                </label>
                <input
                  type="text"
                  name="caption"
                  id="caption"
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  value={caption}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
              </div>
              <div className="flex justify-end mt-3">
                <button
                  className=" text-blue-600 font-semibold bg-white hover:bg-gray-100  focus:outline-none  rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => {
                    setmediaFile(false);
                  }}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-blue-600 font-semibold bg-white hover:bg-gray-100  focus:outline-none  rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendImageModal;
