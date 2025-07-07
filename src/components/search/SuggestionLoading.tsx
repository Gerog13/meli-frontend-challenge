import SuggestionSkeleton from './SuggestionSkeleton';

interface SuggestionLoadingProps {
  rows?: number;
}

export default function SuggestionLoading({ rows = 3 }: SuggestionLoadingProps) {
  return (
    <div className="py-2 px-0 w-full flex flex-col items-center justify-center">
      <SuggestionSkeleton rows={rows} />
    </div>
  );
}
