export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center bg-meli-yellow-light h-18 py-6 mt-8">
      <div className="flex items-center gap-4">
        <img
          src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.130/mercadolibre/logo__small@2x.png"
          alt="Mercado Libre logo"
          className="w-12 h-8"
        />
        <span className="text-lg font-normal capitalize text-[rgba(0,0,0,.9)]">
          meli frontend challenge
        </span>
      </div>
    </footer>
  );
}
