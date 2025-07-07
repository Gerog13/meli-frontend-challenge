export function highlightSuggestion(suggestion: string, query: string) {
  if (!query) return suggestion;
  if (!suggestion.toLowerCase().startsWith(query.toLowerCase())) return suggestion;
  const match = suggestion.slice(0, query.length);
  const rest = suggestion.slice(query.length);
  return (
    <>
      {match}
      <strong className="font-semibold">{rest}</strong>
    </>
  );
}
