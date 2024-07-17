import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function CardSkeleton() {
  return (
    <SkeletonTheme baseColor='gray' highlightColor='#e0dddda9'>
      <div className="bg-[#e0dddda9] rounded rounded-b-xl xl:w-60 mx-3 my-3 sm:my-0 pb-2 transition duration-300 transform hover:scale-110">
        <Skeleton height={144} className="w-full h-36 rounded-t-xl" />
        <div className="mx-3 mt-2">
          <h1>
            <Skeleton count={2} />
          </h1>
        </div>
        <h1 className='mx-3 w-20 my-2'><Skeleton/></h1>
      </div>
    </SkeletonTheme>
  );
}

export default CardSkeleton;
