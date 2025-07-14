import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DesktopSearchBar } from './DesktopSearchBar';
import { useSearchStore } from '../../store/searchStore';

// Mock del store de Zustand
jest.mock('../../store/searchStore');
const mockUseSearchStore = useSearchStore as jest.MockedFunction<typeof useSearchStore>;

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('DesktopSearchBar', () => {
  const mockStore = {
    query: '',
    setQuery: jest.fn(),
    suggestions: [],
    setSuggestions: jest.fn(),
    loadingSuggestions: false,
    setLoadingSuggestions: jest.fn(),
    errorSuggestions: null,
    setErrorSuggestions: jest.fn(),
    setSearchResults: jest.fn(),
    setLoadingResults: jest.fn(),
    setErrorResults: jest.fn(),
    setSearchQuery: jest.fn(),
    searchHistory: [],
    addToHistory: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchStore.mockReturnValue(mockStore);
  });

  const setup = () => {
    renderWithRouter(<DesktopSearchBar />);
    const input = screen.getByRole('textbox');
    return { input };
  };

  it('renderiza el input de búsqueda', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Buscar productos, marcas y más...');
  });

  it('permite escribir en el input', () => {
    const { input } = setup();
    act(() => {
      fireEvent.change(input, { target: { value: 'iPhone' } });
    });
    expect(mockStore.setQuery).toHaveBeenCalledWith('iPhone');
  });

  it('renderiza el botón de búsqueda', () => {
    setup();
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('permite hacer submit del formulario', async () => {
    mockUseSearchStore.mockReturnValue({
      ...mockStore,
      query: 'iPhone 13',
    });

    setup();

    const form = screen.getByRole('search');
    act(() => {
      fireEvent.submit(form);
    });

    expect(mockStore.addToHistory).toHaveBeenCalledWith('iPhone 13');
    expect(mockNavigate).toHaveBeenCalledWith('/iPhone%2013');
  });

  it('permite buscar con Enter', async () => {
    mockUseSearchStore.mockReturnValue({
      ...mockStore,
      query: 'iPhone 13',
    });

    const { input } = setup();

    act(() => {
      fireEvent.keyDown(input, { key: 'Enter' });
    });

    expect(mockStore.setQuery).toHaveBeenCalledWith('iPhone 13');
    expect(mockNavigate).toHaveBeenCalledWith('/iPhone%2013');
  });

  it('no hace nada si el query está vacío', () => {
    mockUseSearchStore.mockReturnValue({
      ...mockStore,
      query: '   ', // solo espacios
    });

    setup();

    const form = screen.getByRole('search');
    act(() => {
      fireEvent.submit(form);
    });

    expect(mockStore.addToHistory).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('renderiza el label de accesibilidad', () => {
    setup();
    const label = screen.getByText('Buscar productos, marcas y más');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('sr-only');
  });

  it('tiene los atributos de accesibilidad correctos', () => {
    setup();
    const input = screen.getByRole('textbox');
    const form = screen.getByRole('search');

    expect(input).toHaveAttribute('aria-label', 'Buscar productos, marcas y más');
    expect(form).toHaveAttribute('autoComplete', 'off');
    expect(input).toHaveAttribute('maxLength', '120');
  });
});
