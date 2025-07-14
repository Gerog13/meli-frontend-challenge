const ProductDetailSkeleton: React.FC = () => {
  return (
    <section className="w-full mx-auto bg-white rounded-md shadow p-0 meli-md:p-8 meli-md:max-w-[1200px] meli-md:my-8 flex flex-col meli-md:grid meli-md:grid-cols-12 meli-md:gap-8 animate-pulse">
      <div className="px-4 pt-4 flex flex-col gap-1 meli-md:hidden">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1 w-full">
            <div className="h-3 w-10 bg-gray-200 rounded" />
            <div className="h-3 w-3 bg-gray-200 rounded ml-1" />
            <div className="h-3 w-16 bg-gray-200 rounded ml-1 flex-1" />
            <div className="h-3 w-20 bg-gray-200 rounded ml-2" />
          </div>
        </div>
        <div className="bg-gray-200 w-[72px] h-4 rounded my-1 py-0.5" />
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-1" />
        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
      </div>
      <div className="meli-md:col-span-8 meli-md:flex meli-md:gap-6 meli-md:items-start">
        <div className="hidden meli-md:flex flex-col gap-2 mt-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className={`w-16 h-16 rounded border-2 border-gray-300 bg-gray-200`} />
          ))}
        </div>
        <div className="w-full min-h-[350px] flex flex-col items-center justify-center bg-gray-50 rounded-t-md mt-2 p-4 relative meli-md:rounded meli-md:bg-white meli-md:shadow-none meli-md:mt-0 meli-md:p-0 meli-md:justify-start">
          <div className="w-full h-[320px] meli-md:h-[500px] meli-md:w-[500px] bg-gray-200 rounded" />
        </div>
      </div>
      <div className="meli-md:col-span-4 flex flex-col gap-4 meli-md:gap-3 meli-md:bg-white meli-md:border meli-md:border-gray-200 meli-md:rounded-md meli-md:p-6 meli-md:min-h-[520px]">
        <div className="hidden meli-md:flex flex-col gap-1 meli-md:px-0 meli-md:pt-0">
          <div className="flex items-center gap-1 mb-1">
            <div className="h-3 w-10 bg-gray-200 rounded" />
            <div className="h-3 w-3 bg-gray-200 rounded ml-1" />
            <div className="h-3 w-16 bg-gray-200 rounded ml-1" />
          </div>
          <div className="bg-gray-200 w-[72px] h-4 rounded my-1 py-0.5" />
          <div className="h-7 w-3/4 bg-gray-200 rounded mb-2" />
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 w-8 bg-gray-200 rounded" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-4 w-8 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="px-4 flex flex-col gap-1 my-2 meli-md:px-0 meli-md:my-0">
          <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
        </div>
        <div className="px-4 pb-4 flex flex-col gap-2 meli-md:px-0 meli-md:pb-0 meli-md:gap-3">
          <div className="h-10 w-full bg-gray-200 rounded mb-2" />
          <div className="h-10 w-full bg-gray-100 rounded" />
        </div>
      </div>
      <div className="pt-12 px-4 pb-8 border-t border-gray-200 meli-md:col-span-12 meli-md:pt-10 meli-md:px-0 meli-md:pb-12 meli-md:border-t-2 meli-md:border-gray-100 meli-md:flex meli-md:gap-8 meli-md:flex-col">
        <div className="meli-md:w-full meli-md:border-0 meli-md:pr-0 mb-8">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-6" />
          <ul className="flex flex-col gap-3 meli-md:gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="flex items-center gap-3 meli-md:gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 meli-md:w-8 meli-md:h-8" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </li>
            ))}
          </ul>
        </div>
        <div className="meli-md:w-full meli-md:pl-0 meli-md:border-t meli-md:border-gray-200 meli-md:pt-10">
          <div className="h-6 w-1/4 bg-gray-200 rounded mb-6" />
          <div className="h-4 w-full bg-gray-200 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
        </div>
      </div>
    </section>
  );
};

export default ProductDetailSkeleton;
