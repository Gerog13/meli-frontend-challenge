const MELI_LOGO =
  'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.7/mercadolibre/logo__large_plus.png';

const categories = ['Tecnología', 'Electrodomésticos', 'Hogar', 'Moda', 'Juguetes'];

const Landing: React.FC = () => (
  <div className="w-full flex flex-col items-center justify-center">
    <div className="flex flex-col items-center justify-center w-full max-w-3xl flex-1 pt-14 meli-md:pt-20">
      <img
        src={MELI_LOGO}
        alt="Mercado Libre"
        className="w-36 h-16 mb-10 object-contain drop-shadow-md"
      />
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center tracking-tight">
        ¡Bienvenido a Mercado Libre!
      </h1>
      <p className="text-xl text-gray-600 mb-10 text-center max-w-2xl">
        Encontrá los mejores productos, marcas y ofertas. Usá el buscador de arriba para comenzar tu
        experiencia de compra.
      </p>
      <div className="w-full flex flex-col items-center">
        <div className="w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center mb-8 border border-gray-100">
          <span className="text-meli-blue text-lg font-bold mb-2">¿No sabés qué buscar?</span>
          <span className="text-gray-500 text-base text-center">
            Probá con{' '}
            <span className="font-semibold text-gray-700">"iPhone", "Notebook", "Auriculares"</span>{' '}
            o navegá por las categorías más populares.
          </span>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="bg-meli-yellow/90 text-gray-800 px-6 py-2 rounded-full font-semibold shadow hover:scale-105 hover:shadow-lg transition-all duration-150 text-lg border border-meli-yellow/80"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
