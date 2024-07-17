import React from 'react'

function Conversation({ isMobile , group, setshowMessagesDiv }) {
  return (
      
      <div onClick={() => { isMobile ? setshowMessagesDiv(false) :"" }} className="flex justify-between items-center p-3 border-b border-[#dee2e7] hover:bg-gray-100 relative cursor-pointer">
          <div className="w-16 h-16 relative flex flex-shrink-0">
              <img className="rounded-full w-full h-full object-cover" src={group.image}  />
          </div>
          <div className="flex-auto min-w-0 ml-4 mr-6  group-hover:block">
              <p className="font-bold">{group.name}</p>
          </div>
      </div>
  )
}

export default Conversation