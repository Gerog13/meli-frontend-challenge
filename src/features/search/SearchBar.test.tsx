import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useIsMobile } from '../../hooks/useIsMobile';

// Mock del hook useIsMobile
jest.mock('../../hooks/useIsMobile');
const mockUseIsMobile = useIsMobile as jest.MockedFunction<typeof useIsMobile>;

const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop SearchBar', () => {
    beforeEach(() => {
      mockUseIsMobile.mockReturnValue(false);
    });

    it('renderiza DesktopSearchBar cuando no es mobile', () => {
      renderWithRouter(<SearchBar />);

      const form = screen.getByRole('search');
      expect(form).toBeInTheDocument();
      expect(form).toHaveClass('nav-search');
    });

    it('renderiza el input de búsqueda', () => {
      renderWithRouter(<SearchBar />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renderiza el botón de búsqueda', () => {
      renderWithRouter(<SearchBar />);
      expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
    });

    it('mantiene la funcionalidad de búsqueda', () => {
      renderWithRouter(<SearchBar />);
      const form = screen.getByRole('search');
      expect(form).toHaveAttribute('role', 'search');
    });

    it('tiene accesibilidad correcta', () => {
      renderWithRouter(<SearchBar />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Buscar productos, marcas y más');
    });

    it('tiene el placeholder correcto para desktop', () => {
      renderWithRouter(<SearchBar />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Buscar productos, marcas y más...');
    });
  });

  describe('Mobile SearchBar', () => {
    beforeEach(() => {
      mockUseIsMobile.mockReturnValue(true);
    });

    it('renderiza MobileSearchBar cuando es mobile', () => {
      renderWithRouter(<SearchBar />);

      const form = screen.getByRole('search');
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute('id', 'search-mobile-form');
    });

    it('renderiza el input de búsqueda', () => {
      renderWithRouter(<SearchBar />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renderiza el botón de búsqueda', () => {
      renderWithRouter(<SearchBar />);
      expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
    });

    it('mantiene la funcionalidad de búsqueda', () => {
      renderWithRouter(<SearchBar />);
      const form = screen.getByRole('search');
      expect(form).toHaveAttribute('role', 'search');
    });

    it('tiene accesibilidad correcta', () => {
      renderWithRouter(<SearchBar />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Buscar productos, marcas y más');
    });

    it('tiene el placeholder correcto para mobile', () => {
      renderWithRouter(<SearchBar />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Estoy buscando...');
    });
  });
});
