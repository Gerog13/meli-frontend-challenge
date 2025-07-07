import SearchSuggestionIcon from '../icons/SearchSuggestionIcon';
import { highlightSuggestion } from '../../utils/highlightSuggestion';

interface SuggestionListProps {
  suggestions: string[];
  query: string;
  onSelect: (query: string) => void;
  addToHistory?: (query: string) => void;
}

export default function SuggestionList({
  suggestions,
  query,
  onSelect,
  addToHistory,
}: SuggestionListProps) {
  return (
    <>
      {suggestions.map((s) => (
        <li
          key={s}
          className="flex items-center gap-3 px-4 py-3 text-[16px] text-[#333] font-normal whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer hover:bg-meli-blue hover:text-white transition-colors duration-150"
          role="option"
          tabIndex={0}
          onMouseDown={() => {
            addToHistory?.(s);
            onSelect(s);
          }}
        >
          <span className="flex-shrink-0">
            <SearchSuggestionIcon width={18} height={18} fill="currentColor" />
          </span>
          <span className="truncate">{highlightSuggestion(s, query)}</span>
        </li>
      ))}
    </>
  );
}
