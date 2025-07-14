import { useState } from 'react';
import type { MouseEvent } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import ProductRating from './ProductRating';
import { useNavigate } from 'react-router-dom';

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

function LikeButton({
  liked,
  onClick,
  className,
  size = 24,
}: {
  liked: boolean;
  onClick: (e: MouseEvent) => void;
  className?: string;
  size?: number;
}) {
  return (
    <button
      type="button"
      aria-label={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      className={className}
      onClick={onClick}
    >
      {liked ? (
        <AiFillHeart size={size} className="text-meli-blue" />
      ) : (
        <AiOutlineHeart size={size} className="text-meli-blue" />
      )}
    </button>
  );
}

function Badge({ badge, condition }: { badge?: string; condition: string }) {
  if (!badge && condition !== 'new') return null;
  return (
    <span
      className={`absolute top-2 left-2 text-white text-xs font-bold rounded px-2 py-1 shadow z-10 meli-md:hidden bg-[#ff6f00]`}
      style={{ letterSpacing: 0.5 }}
    >
      {badge ? badge : 'NUEVO'}
    </span>
  );
}

function PriceBlock({
  price,
  currency_id,
  original_price,
  discount,
  installments,
  shipping,
  condition,
}: Pick<
  ProductCardProps,
  | 'price'
  | 'currency_id'
  | 'original_price'
  | 'discount'
  | 'installments'
  | 'shipping'
  | 'condition'
>) {
  return (
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
        <span className="text-green-600 text-sm font-semibold meli-md:mb-0.5">{discount}% OFF</span>
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
  );
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
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Aqui deberiamos redirigir al id del producto pero como solo tengo un producto, lo hardcodeo
    console.log('Product ID:', id);
    navigate('/item/MLA998877665');
  };

  const handleLikeClick = (e: MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
  };

  return (
    <div
      className="flex gap-4 bg-white rounded-md min-h-[200px] p-4 items-start shadow-[rgba(0,0,0,0.12)_0px_1px_2px_0px] meli-md:max-w-[744px] meli-md:rounded-none  meli-md:w-full meli-md:gap-6 meli-md:items-center relative cursor-pointer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      <LikeButton
        liked={liked}
        onClick={handleLikeClick}
        className="hidden meli-md:flex absolute top-6 right-6 z-20 cursor-pointer"
        size={24}
      />
      <figure className="relative w-[160px] h-[192px] flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden meli-md:w-[220px] meli-md:h-[220px]">
        <Badge badge={badge} condition={condition} />
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
        <LikeButton
          liked={liked}
          onClick={handleLikeClick}
          className="absolute top-2 right-2 cursor-pointer w-8 h-8 flex meli-md:hidden items-center justify-center rounded-full bg-white/90 border-0 shadow focus:outline-none"
          size={18}
        />
      </figure>
      <div className="flex flex-col flex-1 min-w-0 justify-center meli-md:justify-start meli-md:self-start meli-md:gap-3">
        <h3 className="font-normal text-sm meli-md:text-lg meli-md:pt-3 text-[rgba(0,0,0,.9)] mb-1 leading-5 meli-md:mb-0 meli-md:font-light">
          <span className="hover:underline">{title}</span>
        </h3>
        {reviews &&
          typeof reviews.rating_average === 'number' &&
          typeof reviews.total === 'number' && (
            <div className="meli-md:hidden mt-1 mb-1">
              <ProductRating rating_average={reviews.rating_average} total={reviews.total} />
            </div>
          )}
        <div className="flex flex-col meli-md:flex-row meli-md:items-start">
          <PriceBlock
            price={price}
            currency_id={currency_id}
            original_price={original_price}
            discount={discount}
            installments={installments}
            shipping={shipping}
            condition={condition}
          />
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
