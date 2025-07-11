import React from 'react';

interface ProductRatingProps {
  rating_average: number;
  total: number;
  className?: string;
}

const ProductRating: React.FC<ProductRatingProps> = ({ rating_average, total, className = '' }) => {
  return (
    <span className={`flex items-center gap-1 ${className}`}>
      <span className="text-[rgba(0,0,0,.5)] font-normal text-xs meli-md:text-sm ml-0">
        {rating_average}
      </span>
      <span className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width={window.innerWidth >= 720 ? 14 : 12}
            height={window.innerWidth >= 720 ? 14 : 12}
            viewBox="0 0 24 24"
            className="inline-block mx-[0.35px]"
          >
            {i < Math.round(rating_average) ? (
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="#3483fa"
                stroke="#3483fa"
                strokeWidth="1.5"
              />
            ) : (
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="none"
                stroke="#3483fa"
                strokeWidth="1.5"
              />
            )}
          </svg>
        ))}
      </span>
      <span className="text-[rgba(0,0,0,.5)] font-normal text-xs meli-md:text-sm ml-1">
        ({total})
      </span>
    </span>
  );
};

export default ProductRating;
