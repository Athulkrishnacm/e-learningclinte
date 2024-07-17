import React from "react";

function CategoryCard(props) {
  return (
    <div className="p-9 rounded-md shadow-2xl cursor-pointer transition duration-300  transform hover:scale-110" style={{ backgroundColor: props.color }}>
      <img className="w-12" src={props.icon} alt="" />
      <h1 className="text-3xl mb-5 mt-3">{props.title}</h1>
      <p >{props.content}</p>
    </div>
  );
}

export default CategoryCard;