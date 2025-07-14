import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from './ProductList';
import { useSearchStore } from '../../store/searchStore';

// Mock the store
jest.mock('../../store/searchStore', () => ({
  useSearchStore: jest.fn(),
}));

// Mock the API
jest.mock('../../api/search', () => ({
  fetchSuggestions: jest.fn(),
}));

const mockUseSearchStore = useSearchStore as jest.MockedFunction<typeof useSearchStore>;

describe('ProductList', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Default mock implementation
    mockUseSearchStore.mockReturnValue({
      searchResults: [],
      loadingResults: false,
      errorResults: null,
      searchQuery: '',
      setQuery: jest.fn(),
      setSearchResults: jest.fn(),
      setLoadingResults: jest.fn(),
      setErrorResults: jest.fn(),
      setSearchQuery: jest.fn(),
    });
  });

  const renderProductList = () => {
    return render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>,
    );
  };

  it('renders without crashing', () => {
    renderProductList();
    // Just check that it renders without throwing
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('shows no results message when products array is empty and not loading', () => {
    mockUseSearchStore.mockReturnValue({
      searchResults: [],
      loadingResults: false,
      errorResults: null,
      searchQuery: 'test',
      setQuery: jest.fn(),
      setSearchResults: jest.fn(),
      setLoadingResults: jest.fn(),
      setErrorResults: jest.fn(),
      setSearchQuery: jest.fn(),
    });

    renderProductList();

    expect(screen.getByText('No se encontraron resultados para tu búsqueda.')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    mockUseSearchStore.mockReturnValue({
      searchResults: [],
      loadingResults: false,
      errorResults: 'Error de búsqueda',
      searchQuery: 'test',
      setQuery: jest.fn(),
      setSearchResults: jest.fn(),
      setLoadingResults: jest.fn(),
      setErrorResults: jest.fn(),
      setSearchQuery: jest.fn(),
    });

    renderProductList();

    expect(screen.getByText('Error de búsqueda')).toBeInTheDocument();
  });

  it('shows products when available', () => {
    const mockProducts = [
      {
        id: '1',
        title: 'Test Product 1',
        price: 100,
        thumbnail: 'test1.jpg',
        condition: 'new',
        free_shipping: true,
      },
      {
        id: '2',
        title: 'Test Product 2',
        price: 200,
        thumbnail: 'test2.jpg',
        condition: 'used',
        free_shipping: false,
      },
    ];

    mockUseSearchStore.mockReturnValue({
      searchResults: mockProducts,
      loadingResults: false,
      errorResults: null,
      searchQuery: 'test',
      setQuery: jest.fn(),
      setSearchResults: jest.fn(),
      setLoadingResults: jest.fn(),
      setErrorResults: jest.fn(),
      setSearchQuery: jest.fn(),
    });

    renderProductList();

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });
});
