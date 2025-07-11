import SearchBar from '../features/search/SearchBar';
import CartIcon from './icons/CartIcon';
import HamburgerIcon from './icons/HamburgerIcon';

export default function Header() {
  return (
    <header
      className="bg-meli-yellow-light meli-md:bg-meli-yellow w-full border-b border-meli-gray"
      role="banner"
    >
      <div
        className="flex h-12 meli-md:h-auto meli-md:grid meli-md:grid-cols-[162px_minmax(340px,588px)_minmax(350px,390px)] gap-x-5 py-[7px] px-2.5 meli-md:pt-2 meli-md:pb-3 meli-md:px-2.5 max-w-[1200px] mx-auto items-center"
        style={{ boxSizing: 'border-box' }}
      >
        <div className="flex items-center h-[40px]">
          <a
            href="/"
            className="absolute inline-block top-2 left-2.5 meli-md:relative meli-md:top-0 meli-md:left-0"
            aria-label="Ir a inicio Mercado Libre"
          >
            <img
              src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.130/mercadolibre/logo_large_plus@2x.webp"
              alt="Mercado Libre logo"
              className="hidden meli-md:block w-[134px] h-[34px]"
            />
            <img
              src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.130/mercadolibre/logo__small@2x.png"
              alt="Mercado Libre logo"
              className="block meli-md:hidden w-[44px] h-[31px]"
            />
          </a>
        </div>

        <div className="absolute right-[94px] left-16 meli-md:inset-0 meli-md:relative meli-md:col-start-2 meli-md:row-start-1 flex items-center h-[40px]">
          <SearchBar />
        </div>

        <div className="col-start-3 row-start-1 flex items-center justify-end h-[40px]">
          <a
            href="https://www.mercadolibre.com.ar/suscripciones/melimas"
            className="exhibitor__picture hidden meli-md:flex justify-end items-center"
            tabIndex={-1}
            aria-label="meli+ banner"
            style={{ maxWidth: 340, maxHeight: 39 }}
          >
            <img
              src="https://http2.mlstatic.com/D_NQ_724333-MLA84405973064_052025-OO.webp"
              alt="meli+ | Suscríbete desde $3.490 con envíos gratis desde $15.000"
              className="block max-w-[340px] max-h-[39px]"
              style={{ maxWidth: 340, maxHeight: 39 }}
            />
          </a>
          <div className="flex meli-md:hidden items-center gap-2 ml-2">
            <button
              type="button"
              aria-label="Abrir menú"
              className="absolute cursor-pointer right-[45px] w-[45px] h-12 flex flex-col justify-center items-center p-0 bg-transparent border-0 focus:outline-none"
            >
              <HamburgerIcon />
            </button>
            <button
              type="button"
              aria-label="Ver carrito"
              className="absolute right-0 top-0 cursor-pointer w-[45px] h-12 flex items-center justify-center"
            >
              <CartIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
