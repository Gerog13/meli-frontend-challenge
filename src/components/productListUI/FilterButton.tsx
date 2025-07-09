import { PiSlidersHorizontal } from 'react-icons/pi';

export default function FilterButton() {
  return (
    <button
      type="button"
      className="flex items-center justify-center cursor-pointer h-13 w-full gap-2 text-meli-blue text-sm font-light focus:outline-none"
      style={{ minWidth: 80 }}
    >
      <PiSlidersHorizontal className="text-lg" size={14} />
      Filtrar
    </button>
  );
}
