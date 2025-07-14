import { useNavigate } from 'react-router-dom';
import React from 'react';

const related = [
  'iphone xs max',
  'iphone 11',
  'iphone 13',
  'iphone 16 pro max',
  'iphone 8',
  'iphone 14',
  'iphone se',
  'iphone xr',
];

export default function RelatedSearches() {
  const navigate = useNavigate();
  return (
    <div className="hidden meli-md:block w-full p-[14px_28px_30px_10px] text-[15px] text-[rgba(0,0,0,.7)] mb-2 rounded">
      <span className="font-bold text-sm mr-1.5 text-meli-dark">Búsquedas relacionadas:</span>
      {related.map((q, i) => (
        <React.Fragment key={q}>
          <a
            className="text-sm text-meli-dark mx-1 hover:text-meli-blue cursor-pointer transition-all duration-200 inline-block"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${encodeURIComponent(q)}`);
            }}
            href={`/${encodeURIComponent(q)}`}
          >
            {q}
          </a>
          {i < related.length - 1 && <span className="mx-1 text-[rgba(0,0,0,.5)]">-</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
