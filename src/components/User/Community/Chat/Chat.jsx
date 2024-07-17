import React from 'react';
import { BsArrowLeft } from "react-icons/bs";


function Chat({ setShowAbout, currentChat, isMobile, setshowMessagesDiv }) {

    return (
        <div className="chat-header  px-6 py-4 flex flex-row flex-none justify-between items-center border-b">
            <div className="flex">
                {isMobile ?
                    <div className='flex justify-center items-center mr-4' onClick={() => {
                        setshowMessagesDiv(true)
                    }}>
                        <BsArrowLeft size={19} />
                    </div> : ""}
                <div className='flex cursor-pointer' onClick={() => { setShowAbout(true) }} >
                    <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                        <img className=" rounded-full w-full h-full object-cover" src={currentChat ? currentChat.image : ""} />
                    </div>
                    <div className="text-sm cursor-pointer flex justify-center items-center">
                        <p className="font-bold">{currentChat ? currentChat.name : ""}</p>
                        {/* <p>Active 1h ago</p> */}
                    </div>
               </div>
            </div>
            <div className="flex">
            </div>
        </div>
    )
}

export default Chat