import React from 'react';

interface ProductCardProps {
  id?: string;
  title: string;
  price: number;
  currency_id: string;
  condition: string;
  thumbnail?: string;
  installments?: {
    quantity: number;
    amount: number;
  };
  shipping?: {
    free_shipping: boolean;
  };
  reviews?: {
    rating_average: number;
    total: number;
  };
}

export default function ProductCard({
  id,
  title,
  price,
  currency_id,
  condition,
  thumbnail,
  installments,
  shipping,
  reviews,
}: ProductCardProps) {
  return (
    <div className="flex gap-4 bg-white rounded-md min-h-[200px] p-4 items-start shadow-[rgba(0,0,0,0.12)_0px_1px_2px_0px]">
      <figure className="relative w-[160px] h-[192px] flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
        {/* Badge Naranja 'Nuevo' */}
        {condition === 'new' && (
          <span
            className="absolute top-2 left-2 bg-[#ff6f00] text-white text-xs font-bold rounded px-2 py-1 shadow z-10"
            style={{ letterSpacing: 0.5 }}
          >
            NUEVO
          </span>
        )}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-contain"
            style={{ maxWidth: 160, maxHeight: 192 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-2xl">
            ?
          </div>
        )}
        {/* Botón de like/favorito */}
        <button
          type="button"
          aria-label="Agregar a favoritos"
          className="absolute top-2 right-2 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-white/90 border-0 shadow focus:outline-none"
          style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.10)' }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-meli-blue"
          >
            <path
              d="M10 17.5s-6.25-4.375-6.25-8.125A3.75 3.75 0 0 1 10 6.25a3.75 3.75 0 0 1 6.25 3.125C16.25 13.125 10 17.5 10 17.5z"
              stroke="#3483fa"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </figure>

      <div className="flex flex-col flex-1 min-w-0 justify-center">
        {/* Título */}
        <h3 className="font-normal text-sm text-[rgba(0,0,0,.9)] mb-1 leading-5">
          <a
            href={`https://www.mercadolibre.com.ar/item/${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h3>
        {/* Rating */}
        {reviews &&
          typeof reviews.rating_average === 'number' &&
          typeof reviews.total === 'number' && (
            <span className="text-xs flex items-center gap-1">
              <span className="text-[rgba(0,0,0,.5)] font-normal text-xs ml-1">
                {reviews.rating_average}
              </span>
              <span className="flex items-center">
                {/* Estrellas azules */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill={i < Math.round(reviews.rating_average) ? '#3483fa' : '#e0e0e0'}
                    className="inline-block"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </span>
              <span className="text-[rgba(0,0,0,.5)] font-normal text-xs ml-1">
                ({reviews.total})
              </span>
            </span>
          )}
        {/* Precio */}
        <span className="text-xl font-normal text-[rgba(0,0,0,.9)] mt-2">
          {currency_id === 'ARS' ? '$' : currency_id}{' '}
          {typeof price === 'number' ? price.toLocaleString('es-AR') : ''}
        </span>
        {/* Cuotas */}
        {installments && typeof installments.amount === 'number' && installments.quantity ? (
          <span className="text-xs text-[rgba(0,0,0,.9)] mb-1">
            {installments.quantity} cuotas de ${installments.amount.toLocaleString('es-AR')}
          </span>
        ) : null}
        {/* Envío gratis */}
        {shipping && shipping.free_shipping && (
          <span className="text-xs font-semibold text-meli-green mt-2 mb-1">Envío gratis</span>
        )}
        {/* Condición (usado, reacondicionado, etc) si no es nuevo */}
        {condition !== 'new' && (
          <span className="text-xs text-gray-500 mb-1 capitalize">
            {condition === 'used' ? 'Usado' : condition}
          </span>
        )}
      </div>
    </div>
  );
}
