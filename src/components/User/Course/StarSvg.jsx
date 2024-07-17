import React from "react";
function StarSvg({ count,totalReviews }) {
  count = Math.floor(count)
  const calculateStars = (star) => {
    const stars = [];
    for (let i = 1; i <= star; i++) {
      stars.push({ index: i, filled: true });
    }
    for (let i = star + 1; i <= 5; i++) {
      stars.push({ index: i, filled: false });
    }
    return stars;
  };
 
  return (
    <>
      {calculateStars(count).map((star,index) => (
        <svg key={index}
          aria-hidden="true"
          className={`w-5 h-5 ${
            star.filled ? "text-yellow-400" : "text-gray-400"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <title>{star.index} star</title>
          
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
       &nbsp;&nbsp;{totalReviews&&(<p className="text-sm font-medium text-gray-900 underline hover:no-underline">  {totalReviews} review</p>)}
    </>
  );
}
export default StarSvg;
