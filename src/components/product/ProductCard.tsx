import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import ProductRating from './ProductRating';
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
  original_price?: number;
  discount?: number;
  badge?: string;
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
  original_price,
  discount,
  badge,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex gap-4 bg-white rounded-md min-h-[200px] p-4 items-start shadow-[rgba(0,0,0,0.12)_0px_1px_2px_0px] meli-md:max-w-[744px] meli-md:rounded-none  meli-md:w-full meli-md:gap-6 meli-md:items-center relative">
      <button
        type="button"
        aria-label={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        className="hidden meli-md:flex absolute top-6 right-6 z-20 cursor-pointer"
        onClick={() => setLiked((prev) => !prev)}
      >
        {liked ? (
          <AiFillHeart size={24} className="text-meli-blue" />
        ) : (
          <AiOutlineHeart size={24} className="text-meli-blue" />
        )}
      </button>
      <figure className="relative w-[160px] h-[192px] flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden meli-md:w-[220px] meli-md:h-[220px]">
        {(condition === 'new' || badge) && (
          <span
            className={`absolute top-2 left-2 text-white text-xs font-bold rounded px-2 py-1 shadow z-10 meli-md:hidden ${badge ? 'bg-[#ff6f00]' : 'bg-[#ff6f00]'}`}
            style={{ letterSpacing: 0.5 }}
          >
            {badge ? badge : 'NUEVO'}
          </span>
        )}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-contain"
            style={{ maxWidth: 220, maxHeight: 220 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-2xl">
            ?
          </div>
        )}
        <button
          type="button"
          aria-label={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className="absolute top-2 right-2 cursor-pointer w-8 h-8 flex meli-md:hidden items-center justify-center rounded-full bg-white/90 border-0 shadow focus:outline-none"
          style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.10)' }}
          onClick={() => setLiked((prev) => !prev)}
        >
          {liked ? (
            <AiFillHeart size={18} className="text-meli-blue" />
          ) : (
            <AiOutlineHeart size={18} className="text-meli-blue" />
          )}
        </button>
      </figure>

      <div className="flex flex-col flex-1 min-w-0 justify-center meli-md:justify-start meli-md:self-start meli-md:gap-3">
        <h3 className="font-normal text-sm meli-md:text-lg meli-md:pt-3 text-[rgba(0,0,0,.9)] mb-1 leading-5 meli-md:mb-0 meli-md:font-light">
          <a
            href={`https://www.mercadolibre.com.ar/item/${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h3>
        {reviews &&
          typeof reviews.rating_average === 'number' &&
          typeof reviews.total === 'number' && (
            <div className="meli-md:hidden mt-1 mb-1">
              <ProductRating rating_average={reviews.rating_average} total={reviews.total} />
            </div>
          )}
        <div className="flex flex-col meli-md:flex-row meli-md:items-start">
          <div className="flex flex-col meli-md:gap-1 meli-md:min-w-[260px]">
            {original_price && original_price > price && (
              <span className="text-sm text-gray-400 line-through meli-md:mb-0.5">
                {currency_id === 'ARS' ? '$' : currency_id} {original_price.toLocaleString('es-AR')}
              </span>
            )}
            <span className="text-xl meli-md:text-2xl font-normal text-[rgba(0,0,0,.9)] mt-2 meli-md:mt-0 meli-md:mb-0.5">
              {currency_id === 'ARS' ? '$' : currency_id}{' '}
              {typeof price === 'number' ? price.toLocaleString('es-AR') : ''}
            </span>
            {discount && (
              <span className="text-green-600 text-sm font-semibold meli-md:mb-0.5">
                {discount}% OFF
              </span>
            )}
            {installments && typeof installments.amount === 'number' && installments.quantity ? (
              <span className="text-xs text-[rgba(0,0,0,.9)] meli-md:text-sm meli-md:font-light meli-md:mb-0.5">
                {installments.quantity} cuotas de ${installments.amount.toLocaleString('es-AR')}
              </span>
            ) : null}
            {shipping && shipping.free_shipping && (
              <span className="text-xs font-semibold text-meli-green mt-2 meli-md:text-sm mb-1 meli-md:mt-0">
                Envío gratis
              </span>
            )}
            {condition !== 'new' && (
              <span className="text-xs text-[rgba(0,0,0,.5)] mb-1 capitalize meli-md:text-sm meli-md:mb-0.5">
                {condition === 'used' ? 'Usado' : condition}
              </span>
            )}
          </div>
          {reviews &&
            typeof reviews.rating_average === 'number' &&
            typeof reviews.total === 'number' && (
              <div className="hidden meli-md:flex flex-col items-start flex-1 gap-1">
                <ProductRating rating_average={reviews.rating_average} total={reviews.total} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
