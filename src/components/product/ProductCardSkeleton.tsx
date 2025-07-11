import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex gap-4 bg-white rounded-md min-h-[200px] p-4 items-start shadow-[rgba(0,0,0,0.12)_0px_1px_2px_0px] meli-md:max-w-[744px] meli-md:rounded-none meli-md:w-full meli-md:gap-6 meli-md:items-center relative animate-pulse">
      <div className="hidden meli-md:flex absolute top-6 right-6 z-20 w-8 h-8 rounded-full bg-gray-200" />
      <figure className="relative w-[160px] h-[192px] flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden meli-md:w-[220px] meli-md:h-[220px]">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[120px] h-[120px] bg-gray-200 rounded" />
        </div>
      </figure>
      <div className="flex flex-col flex-1 min-w-0 justify-center meli-md:justify-start meli-md:self-start meli-md:gap-3">
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="meli-md:hidden flex items-center gap-2 mb-2">
          <div className="h-3 w-8 bg-gray-200 rounded" />
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-3 w-6 bg-gray-200 rounded" />
        </div>
        <div className="flex flex-col meli-md:flex-row meli-md:items-start">
          <div className="flex flex-col meli-md:gap-1 meli-md:min-w-[260px]">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
          </div>
          <div className="hidden meli-md:flex flex-col items-start flex-1 gap-1 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-8 bg-gray-200 rounded" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
                ))}
              </div>
              <div className="h-4 w-8 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
