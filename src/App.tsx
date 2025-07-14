import Header from './components/Header';
import ProductList from './features/product/ProductList';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import ProductDetail from './features/product/ProductDetail';
import Landing from './components/Landing';

function App() {
  return (
    <div className="min-h-screen bg-meli-gray flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-0 pb-6 w-full flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path=":query" element={<ProductList />} />
          <Route path="/item/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
