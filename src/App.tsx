import Header from './components/Header';
import ProductList from './features/product/ProductList';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-meli-gray">
      <Header />
      <main className="max-w-7xl mx-auto px-0 pb-6">
        <Routes>
          <Route path="/" element={<div />} />
          <Route path=":query" element={<ProductList />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
