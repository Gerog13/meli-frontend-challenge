import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetailById } from '../../api/search';
import {
  MdMemory,
  MdPhoneIphone,
  MdBusiness,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
} from 'react-icons/md';
import { useIsMobile } from '../../hooks/useIsMobile';
import ProductRating from '../../components/product/ProductRating';
import ProductDetailSkeleton from '../../components/product/ProductDetailSkeleton';

interface ProductDetailType {
  id: string;
  title: string;
  price: number;
  original_price?: number;
  currency_id: string;
  available_quantity?: number;
  sold_quantity?: number;
  condition: string;
  permalink?: string;
  pictures: { id: string; url: string }[];
  installments?: { quantity: number; amount: number; rate?: number; currency_id?: string };
  shipping?: { free_shipping: boolean };
  seller_address?: { city: { name: string }; state: { name: string } };
  attributes?: { id: string; name: string; value_name: string }[];
  warranty?: string;
  description: { plain_text: string };
  reviews: { rating_average: number; total: number };
}

const ProductGallery: React.FC<{
  images: { id: string; url: string }[];
  title: string;
  currentImage: number;
  setCurrentImage: (idx: number) => void;
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
  handlePrev: (e?: React.MouseEvent) => void;
  handleNext: (e?: React.MouseEvent) => void;
}> = ({
  images,
  title,
  currentImage,
  setCurrentImage,
  showOverlay,
  setShowOverlay,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="meli-md:col-span-8 meli-md:flex meli-md:gap-6 meli-md:items-start">
      <div className="hidden meli-md:flex flex-col gap-2 mt-2">
        {images.map((img, idx) => (
          <button
            key={img.id}
            className={`w-16 h-16 cursor-pointer rounded border-2 ${idx === currentImage ? 'border-meli-blue' : 'border-gray-200'} bg-white flex items-center justify-center overflow-hidden`}
            onClick={() => setCurrentImage(idx)}
            aria-label={`Ver imagen ${idx + 1}`}
          >
            <img src={img.url} alt={title} className="object-contain w-full h-full" />
          </button>
        ))}
      </div>
      <div className="w-full min-h-[350px] flex flex-col items-center justify-center bg-gray-50 rounded-t-md mt-2 p-4 relative meli-md:rounded meli-md:bg-white meli-md:shadow-none meli-md:mt-0 meli-md:p-0 meli-md:justify-start">
        <span className="absolute top-2 left-2 bg-white/90 text-xs rounded-full px-2 py-0.5 text-gray-700 font-medium shadow meli-md:hidden">
          {images.length > 0 ? `${currentImage + 1} / ${images.length}` : ''}
        </span>
        {images[currentImage] && (
          <img
            src={images[currentImage].url}
            alt={title}
            className="object-contain max-h-[320px] max-w-full cursor-zoom-in mx-auto meli-md:max-h-[500px] meli-md:max-w-[500px]"
            onClick={() => setShowOverlay(true)}
            aria-label="Ampliar imagen"
          />
        )}
        <div className="flex gap-2 mt-4 meli-md:hidden">
          {images.map((img, idx) => (
            <button
              key={img.id}
              className={`w-2.5 h-2.5 rounded-full ${idx === currentImage ? 'bg-meli-blue' : 'bg-gray-300'}`}
              aria-label={`Ver imagen ${idx + 1}`}
              onClick={() => setCurrentImage(idx)}
            />
          ))}
        </div>
        {showOverlay && (
          <ProductGalleryOverlay
            images={images}
            title={title}
            currentImage={currentImage}
            setShowOverlay={setShowOverlay}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        )}
      </div>
    </div>
  );
};

const ProductGalleryOverlay: React.FC<{
  images: { id: string; url: string }[];
  title: string;
  currentImage: number;
  setShowOverlay: (show: boolean) => void;
  handlePrev: (e?: React.MouseEvent) => void;
  handleNext: (e?: React.MouseEvent) => void;
}> = ({ images, title, currentImage, setShowOverlay, handlePrev, handleNext }) => (
  <div
    className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center transition-all"
    onClick={() => setShowOverlay(false)}
    role="dialog"
    aria-modal="true"
  >
    <button
      className="absolute top-4 left-4 text-white text-3xl"
      onClick={(e) => {
        e.stopPropagation();
        setShowOverlay(false);
      }}
      aria-label="Cerrar"
    >
      <MdClose />
    </button>
    <div className="flex items-center justify-center w-full h-full max-h-[90vh]">
      <button
        className="text-white text-4xl px-2 py-1 hover:bg-white/10 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev(e);
        }}
        aria-label="Anterior"
      >
        <MdChevronLeft />
      </button>
      <img
        src={images[currentImage].url}
        alt={title}
        className="object-contain max-h-[80vh] max-w-[90vw] mx-4"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="text-white text-4xl px-2 py-1 hover:bg-white/10 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          handleNext(e);
        }}
        aria-label="Siguiente"
      >
        <MdChevronRight />
      </button>
    </div>
    <span className="absolute top-4 right-4 bg-black/60 text-white text-xs rounded-full px-2 py-0.5">
      {currentImage + 1} / {images.length}
    </span>
  </div>
);

const ProductInfoPanel: React.FC<{
  detail: ProductDetailType;
}> = ({ detail }) => (
  <div className="meli-md:col-span-4 flex flex-col gap-4 meli-md:gap-3 meli-md:bg-white meli-md:border meli-md:border-gray-200 meli-md:rounded-md meli-md:p-6 meli-md:min-h-[520px]">
    <div className="hidden meli-md:flex flex-col gap-1 meli-md:px-0 meli-md:pt-0">
      <div className="flex items-center gap-1 mb-1">
        <span className="text-xs text-gray-500 capitalize">
          {detail.condition === 'new' ? 'Nuevo' : 'Usado'}
        </span>
        <span className="text-xs text-gray-500 ml-1">|</span>
        {detail.sold_quantity && (
          <span className="text-xs text-gray-500 ml-1"> {detail.sold_quantity} vendidos</span>
        )}
      </div>
      <span className="bg-meli-orange w-[72px] flex items-center justify-center text-[10px] font-normal text-white rounded my-1 py-0.5">
        MÁS VENDIDO
      </span>
      <h1 className="text-2xl font-normal text-[rgba(0,0,0,.9)] leading-8">{detail.title}</h1>
      <div className="flex items-center gap-1">
        <span className="text-[rgba(0,0,0,.5)] text-base">{detail.reviews.rating_average}</span>
        <span className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width={18}
              height={18}
              viewBox="0 0 24 24"
              className="inline-block mx-[0.35px]"
            >
              {i < Math.round(detail.reviews.rating_average) ? (
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
        <span className="text-[rgba(0,0,0,.5)] text-base ml-1">({detail.reviews.total})</span>
      </div>
    </div>
    <div className="px-4 flex flex-col gap-1 my-2 meli-md:px-0 meli-md:my-0">
      {detail.original_price && detail.original_price > detail.price && (
        <span className="text-sm text-gray-400 line-through">
          ${detail.original_price.toLocaleString('es-AR')}
        </span>
      )}
      <span className="text-[32px] font-light leading-8 text-[rgba(0,0,0,.9)] meli-md:text-4xl meli-md:font-normal meli-md:mb-0.5">
        ${detail.price.toLocaleString('es-AR')}
      </span>
      {detail.installments && (
        <span className="text-lg leading-6 text-[rgba(0,0,0,.9)] meli-md:text-base meli-md:font-light meli-md:mb-0.5">
          {detail.installments.quantity} cuotas de $
          {detail.installments.amount.toLocaleString('es-AR')}
        </span>
      )}
      {detail.shipping?.free_shipping && (
        <span className="text-meli-green mt-1 text-sm font-semibold meli-md:text-base meli-md:font-semibold">
          Envío gratis
        </span>
      )}
    </div>
    <div className="px-4 pb-4 flex flex-col gap-2 meli-md:px-0 meli-md:pb-0 meli-md:gap-3">
      <button className="cursor-pointer w-full bg-meli-blue text-white rounded py-3 font-semibold text-base meli-md:text-lg meli-md:rounded-md">
        Comprar ahora
      </button>
      <button className="cursor-pointer w-full bg-meli-blue/15 text-meli-blue rounded py-3 font-semibold text-base meli-md:text-lg meli-md:rounded-md">
        Agregar al carrito
      </button>
    </div>
  </div>
);

const ProductAttributes: React.FC<{
  attributes?: { id: string; name: string; value_name: string }[];
}> = ({ attributes }) => (
  <div className="meli-md:w-full meli-md:border-0 meli-md:pr-0 mb-8">
    <h2 className="text-xl font-normal mb-6 meli-md:text-lg meli-md:mb-4">
      Características del producto
    </h2>
    <ul className="flex flex-col gap-3 meli-md:gap-2">
      {attributes?.map((attr) => {
        let icon = null;
        if (attr.id === 'STORAGE_CAPACITY') icon = <MdMemory size={24} />;
        else if (attr.id === 'MODEL') icon = <MdPhoneIphone size={24} />;
        else if (attr.id === 'BRAND') icon = <MdBusiness size={24} />;
        return (
          <li key={attr.id} className="flex items-center gap-3 meli-md:gap-2">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 meli-md:w-8 meli-md:h-8">
              {icon}
            </span>
            <span className="text-sm text-gray-700 meli-md:text-xs">
              <span className="font-normal">{attr.name}:</span>{' '}
              <span className="font-semibold">{attr.value_name}</span>
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

const ProductDescription: React.FC<{ description: string }> = ({ description }) => (
  <div className="meli-md:w-full meli-md:pl-0 border-t border-gray-200 pt-10">
    <h2 className="text-xl font-normal mb-6 meli-md:text-lg meli-md:mb-4">Descripción</h2>
    <p className="text-base font-normal text-[rgba(0,0,0,.55)] leading-5 meli-md:text-base meli-md:font-light meli-md:text-gray-700">
      {description}
    </p>
  </div>
);

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<ProductDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const isMobile = useIsMobile(720);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setShowSkeleton(true);
    fetchProductDetailById(id || 'MLA998877665')
      .then((data) => {
        setDetail(data);
        if (data.title) document.title = `${data.title} | Mercado Libre`;
      })
      .catch(() => setError('No se pudo cargar el producto.'))
      .finally(() => {
        setLoading(false);
        setShowSkeleton(false);
      });
  }, [id]);

  const images = detail?.pictures || [];

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length],
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length],
  );

  useEffect(() => {
    if (!showOverlay) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setShowOverlay(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showOverlay, handlePrev, handleNext]);

  if (loading || showSkeleton) {
    return <ProductDetailSkeleton />;
  }
  if (error || !detail) {
    return (
      <div className="w-full flex justify-center items-center py-12 text-red-500">
        {error || 'Producto no encontrado.'}
      </div>
    );
  }

  return (
    <section className="w-full mx-auto bg-white rounded-md shadow p-0 meli-md:p-8 meli-md:max-w-[1200px] meli-md:my-8 flex flex-col meli-md:grid meli-md:grid-cols-12 meli-md:gap-8">
      {/* Mobile header */}
      <div className="px-4 pt-4 flex flex-col gap-1 meli-md:hidden">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1 w-full">
            <span className="text-xs text-gray-500 capitalize">
              {detail.condition === 'new' ? 'Nuevo' : 'Usado'}
            </span>
            <span className="text-xs text-gray-500 ml-1">|</span>
            {detail.sold_quantity && (
              <span className="text-xs flex-1 text-gray-500 ml-1">
                {' '}
                {detail.sold_quantity} vendidos
              </span>
            )}
            {isMobile && (
              <span className="ml-2">
                <ProductRating
                  rating_average={detail.reviews.rating_average}
                  total={detail.reviews.total}
                />
              </span>
            )}
          </div>
        </div>
        <span className="bg-meli-orange w-[72px] flex items-center justify-center text-[10px] font-normal text-white rounded my-1 py-0.5">
          MÁS VENDIDO
        </span>
        <h1 className="text-base font-normal text-[rgba(0,0,0,.9)] leading-6 mb-1">
          {detail.title}
        </h1>
        {!isMobile && (
          <div className="flex items-center gap-1 mb-2">
            <ProductRating
              rating_average={detail.reviews.rating_average}
              total={detail.reviews.total}
            />
          </div>
        )}
      </div>
      <ProductGallery
        images={images}
        title={detail.title}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <ProductInfoPanel detail={detail} />
      <div className="pt-10 px-4 pb-8 border-t border-gray-200 meli-md:col-span-12 meli-md:px-0 meli-md:pb-12 meli-md:border-t-2 meli-md:border-gray-100 meli-md:flex meli-md:gap-8 meli-md:flex-col">
        <ProductAttributes attributes={detail.attributes} />
        <ProductDescription description={detail.description.plain_text} />
      </div>
    </section>
  );
};

export default ProductDetail;
