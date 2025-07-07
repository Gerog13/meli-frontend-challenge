import { CiClock2 } from 'react-icons/ci';

interface SuggestionHistoryProps {
  history: string[];
  onSelect: (query: string) => void;
}

export default function SuggestionHistory({ history, onSelect }: SuggestionHistoryProps) {
  return (
    <>
      {history.map((s) => (
        <li
          key={s}
          className="flex items-center gap-3 px-4 py-3 text-[16px] text-[#333] font-normal whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer hover:bg-meli-blue hover:text-white transition-colors duration-150"
          role="option"
          tabIndex={0}
          onMouseDown={() => onSelect(s)}
        >
          <span className="flex-shrink-0">
            <CiClock2 size={18} color="#ccc" />
          </span>
          <span className="truncate">{s}</span>
        </li>
      ))}
    </>
  );
}
