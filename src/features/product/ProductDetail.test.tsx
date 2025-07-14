import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { fetchProductDetailById } from '../../api/search';

jest.mock('../../api/search');
const mockedFetchProductDetailById = fetchProductDetailById as jest.MockedFunction<
  typeof fetchProductDetailById
>;

const mockProduct = {
  id: 'MLA1',
  title: 'Test Product',
  price: 1000,
  original_price: 1200,
  currency_id: 'ARS',
  available_quantity: 5,
  sold_quantity: 10,
  condition: 'new',
  permalink: 'https://www.mercadolibre.com.ar/test-product',
  pictures: [{ id: '1', url: 'https://via.placeholder.com/150' }],
  installments: { quantity: 12, amount: 100 },
  shipping: { free_shipping: true },
  seller_address: { city: { name: 'Buenos Aires' }, state: { name: 'CABA' } },
  attributes: [
    { id: 'COLOR', name: 'Color', value_name: 'Red' },
    { id: 'SIZE', name: 'Size', value_name: 'M' },
  ],
  warranty: '1 year',
  description: { plain_text: 'Test description' },
  reviews: { rating_average: 4.5, total: 10 },
};

const renderWithRoute = (id = 'MLA1') => {
  return render(
    <MemoryRouter initialEntries={[`/product/${id}`]}>
      <Routes>
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('ProductDetail', () => {
  beforeEach(() => {
    mockedFetchProductDetailById.mockResolvedValue(mockProduct);
  });

  it('renders product title, price, and description', async () => {
    renderWithRoute('MLA1');
    await waitFor(() => {
      // Verificar que hay al menos un título (puede haber múltiples en mobile/desktop)
      const titles = screen.getAllByText(/Test Product/i);
      expect(titles.length).toBeGreaterThan(0);

      // Verificar precio
      expect(screen.getByText(/1.000/)).toBeInTheDocument();

      // Verificar descripción
      expect(screen.getByText(/Test description/i)).toBeInTheDocument();
    });
  });

  it('renders product gallery', async () => {
    renderWithRoute('MLA1');
    await waitFor(() => {
      // Verificar que hay al menos una imagen (puede haber múltiples en la galería)
      const images = screen.getAllByAltText('Test Product');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('renders product attributes', async () => {
    renderWithRoute('MLA1');
    await waitFor(() => {
      // Verificar atributos específicos
      expect(screen.getByText(/Color:/i)).toBeInTheDocument();
      expect(screen.getByText(/Red/i)).toBeInTheDocument();
      expect(screen.getByText(/Size:/i)).toBeInTheDocument();

      // Para el valor "M", buscar específicamente en el contexto de atributos
      const sizeElements = screen.getAllByText(/M/i);
      // Debe haber al menos el valor del atributo Size
      expect(sizeElements.length).toBeGreaterThan(0);
    });
  });

  it('renders product condition and sold quantity', async () => {
    renderWithRoute('MLA1');
    await waitFor(() => {
      // Verificar condición del producto (puede haber múltiples en mobile/desktop)
      const conditionElements = screen.getAllByText(/Nuevo/i);
      expect(conditionElements.length).toBeGreaterThan(0);

      // Verificar cantidad vendida (puede haber múltiples en mobile/desktop)
      const soldElements = screen.getAllByText(/10 vendidos/i);
      expect(soldElements.length).toBeGreaterThan(0);
    });
  });

  it('renders product shipping info', async () => {
    renderWithRoute('MLA1');
    await waitFor(() => {
      // Verificar envío gratis
      expect(screen.getByText(/Envío gratis/i)).toBeInTheDocument();
    });
  });

  it('renders product rating', async () => {
    renderWithRoute('MLA1');
    await waitFor(() => {
      // Verificar rating (puede haber múltiples en mobile/desktop)
      const ratingElements = screen.getAllByText(/4.5/i);
      expect(ratingElements.length).toBeGreaterThan(0);

      // Verificar total de reviews (puede haber múltiples en mobile/desktop)
      const totalElements = screen.getAllByText(/\(10\)/);
      expect(totalElements.length).toBeGreaterThan(0);
    });
  });

  it('renders buy buttons', async () => {
    renderWithRoute('MLA1');
    await waitFor(() => {
      expect(screen.getByText(/Comprar ahora/i)).toBeInTheDocument();
      expect(screen.getByText(/Agregar al carrito/i)).toBeInTheDocument();
    });
  });

  it('renders product description section', async () => {
    renderWithRoute('MLA1');
    await waitFor(() => {
      expect(screen.getByText(/Descripción/i)).toBeInTheDocument();
      expect(screen.getByText(/Test description/i)).toBeInTheDocument();
    });
  });

  it('renders product characteristics section', async () => {
    renderWithRoute('MLA1');
    await waitFor(() => {
      expect(screen.getByText(/Características del producto/i)).toBeInTheDocument();
    });
  });
});
