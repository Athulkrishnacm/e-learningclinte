import React from "react";

function Card({ title, icon, count }) {
  return (
    <div className="my-5 bg-[#1F2A40] rounded-md  ">
        <div className="pt-8  flex justify-center">
          {React.createElement(icon, { size: "30", color: "#70D8BD" })}
          <span className="text-2xl mx-5">{count}</span>
        </div>
        <div className="flex justify-center pb-8">
          <h1 className="mx-10 mt-3">{title}</h1>
        </div>
     
    </div>
  );
}

export default Card;
