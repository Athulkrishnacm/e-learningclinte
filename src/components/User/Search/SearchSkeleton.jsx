import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SearchSkeleton() {
  return (
    <SkeletonTheme baseColor="gray" highlightColor="#e0dddda9">
      <div className="mx-3 lg:mx-20 mb-10">
        <div className="flex justify-center mt-4 sm:mx-10 m-3">
          <div className="flex p-4 w-full max-w-screen-lg hover:bg-violet-50 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row">
            <div className="rounded-md mt-4 sm:mt-0 w-full sm:w-56 sm:h-32 object-cover ">
              <Skeleton height={130} />
            </div>
            <div className="flex flex-col ml-0 sm:ml-3  justify-between mt-2 sm:0 p-4 leading-normal">
                <div className="w-72">
              <Skeleton  height={30} />
                </div>
              <div className="my-2 w-96">
                <Skeleton  count={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default SearchSkeleton;
