import { useState, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

const SORT_OPTIONS = [
  { label: 'Más relevantes', value: 'relevant' },
  { label: 'Menor precio', value: 'lowest' },
  { label: 'Mayor precio', value: 'highest' },
];

export default function SortDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(SORT_OPTIONS[0]);
  const dropdownRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="hidden meli-md:flex items-center justify-end w-full mb-4 relative select-none">
      <span className="text-[15px] text-[rgba(0,0,0,.9)] font-normal mr-1.5">Ordenar por</span>
      <button
        type="button"
        className="cursor-pointer flex items-center gap-1 text-[rgba(0,0,0,.9)] text-sm font-normal focus:outline-none hover:text-meli-blue/90 transition-all duration-200"
        onClick={() => setOpen((v) => !v)}
        ref={dropdownRef}
      >
        {selected.label}
        {open ? (
          <IoIosArrowUp size={16} className="text-meli-blue" />
        ) : (
          <IoIosArrowDown size={16} className="text-meli-blue" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-30 min-w-[200px] px-0 animate-fade-in">
          {SORT_OPTIONS.map((opt, idx) => {
            const isSelected = selected.value === opt.value;
            const isFirst = idx === 0;
            const isLast = idx === SORT_OPTIONS.length - 1;
            return (
              <button
                key={opt.value}
                className={`flex items-center w-full text-left px-5 py-3 text-[15px] font-normal border-l-4 h-[41px] transition duration-150 ease-in
                  ${isSelected ? 'text-meli-blue bg-meli-blue/5 border-meli-blue font-semibold' : 'text-black bg-white border-transparent hover:bg-meli-blue/5 hover:border-[#9cc4db]'}
                  ${isFirst ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''}`}
                style={
                  isSelected
                    ? {
                        borderTopLeftRadius: isFirst ? '0.5rem' : undefined,
                        borderBottomLeftRadius: isLast ? '0.5rem' : undefined,
                      }
                    : {}
                }
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.18s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
}
