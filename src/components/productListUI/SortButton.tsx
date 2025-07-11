import { LuArrowUpDown } from 'react-icons/lu';

export default function SortButton() {
  return (
    <button
      type="button"
      className="flex items-center justify-center cursor-pointer h-13 w-full gap-2 text-meli-blue text-sm font-light focus:outline-none"
    >
      <LuArrowUpDown className="text-lg" size={14} /> Ordenar
    </button>
  );
}
