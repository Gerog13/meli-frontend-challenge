import { MdArrowForwardIos } from 'react-icons/md';

export default function Paginator({ page = 1 }: { page?: number }) {
  return (
    <div className="flex items-center justify-center w-full bg-meli-gray py-6 gap-[14px]">
      <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-meli-blue rounded-lg text-base font-medium text-black bg-white">
        {page}
      </span>
      <button
        type="button"
        className="flex items-center py-1.5 px-2 gap-1 text-[rgba(0,0,0,0.55)] text-base font-normal bg-transparent border-1 border-transparent rounded-[5px] hover:bg-meli-blue/10 outline-none cursor-pointer transition-all duration-200"
        disabled
      >
        Siguiente <MdArrowForwardIos size={14} />
      </button>
    </div>
  );
}
