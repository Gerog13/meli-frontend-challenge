import React from 'react';

export const SuggestionSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => (
  <ul className="w-full" aria-hidden="true">
    {Array.from({ length: rows }).map((_, i) => (
      <li key={i} className="flex items-center gap-3 px-4 py-3 animate-pulse">
        <span className="w-5 h-5 bg-gray-200 rounded-full" />
        <span className="h-4 w-2/3 bg-gray-200 rounded" />
      </li>
    ))}
  </ul>
);

export default SuggestionSkeleton;
