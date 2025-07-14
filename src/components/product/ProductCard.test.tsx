import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ProductCard', () => {
  const baseProps = {
    id: 'MLA123',
    title: 'iPhone 13',
    price: 1367999,
    currency_id: 'ARS',
    condition: 'new',
    thumbnail: 'https://example.com/iphone.jpg',
    installments: { quantity: 12, amount: 113999.92 },
    shipping: { free_shipping: true },
    reviews: { rating_average: 4.9, total: 35 },
    original_price: 1500000,
    discount: 10,
    badge: 'NUEVO',
  };

  it('renders product title and price', () => {
    renderWithRouter(<ProductCard {...baseProps} />);
    expect(screen.getByText(/iPhone 13/i)).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.replace(/\s/g, '').includes('1.367.999')),
    ).toBeInTheDocument();
  });

  it('renders the rating and reviews', () => {
    renderWithRouter(<ProductCard {...baseProps} />);
    expect(screen.getAllByText('4.9').length).toBeGreaterThan(0);
    expect(screen.getAllByText('(35)').length).toBeGreaterThan(0);
  });

  it('renders the like button and toggles state', () => {
    renderWithRouter(<ProductCard {...baseProps} />);
    const likeBtn = screen.getAllByLabelText(/Agregar a favoritos/i)[0];
    fireEvent.click(likeBtn);
    expect(screen.getAllByLabelText(/Quitar de favoritos/i)[0]).toBeInTheDocument();
  });

  it('renders the badge if provided', () => {
    renderWithRouter(<ProductCard {...baseProps} badge="MÁS VENDIDO" />);
    expect(screen.getByText(/MÁS VENDIDO/i)).toBeInTheDocument();
  });

  it('renders the original price and discount', () => {
    renderWithRouter(<ProductCard {...baseProps} />);
    expect(
      screen.getByText((content) => content.replace(/\s/g, '').includes('1.500.000')),
    ).toBeInTheDocument();
    expect(screen.getByText(/10% OFF/i)).toBeInTheDocument();
  });

  it('renders free shipping label', () => {
    renderWithRouter(<ProductCard {...baseProps} />);
    expect(screen.getByText(/Envío gratis/i)).toBeInTheDocument();
  });
});
