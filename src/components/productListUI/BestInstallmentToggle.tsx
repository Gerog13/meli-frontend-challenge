import { useState } from 'react';

export default function BestInstallmentToggle() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white h-[46px] pr-5 pl-3 border-b border-gray-100">
      <span className="text-xs font-normal text-black">Mejor precio en cuotas</span>
      <label className="inline-flex relative items-center cursor-pointer select-none w-8 h-4">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={() => setChecked((v) => !v)}
        />
        <span
          className={`transition-colors duration-200 ease-in-out w-full h-full rounded-full flex items-center px-0.5
            ${checked ? 'bg-meli-blue' : 'bg-[#e5e7eb]'}
          `}
        >
          <span
            className={`transition-all duration-200 ease-in-out w-3 h-3 rounded-full bg-white shadow
              ${checked ? 'translate-x-4' : 'translate-x-0'}
            `}
            style={{
              boxShadow: checked
                ? '0 2px 8px 0 rgba(52,131,250,0.18)'
                : '0 2px 8px 0 rgba(0,0,0,0.10)',
            }}
          />
        </span>
      </label>
    </div>
  );
}
