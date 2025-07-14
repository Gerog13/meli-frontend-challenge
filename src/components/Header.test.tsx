import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Header', () => {
  it('renderiza el header', () => {
    renderWithRouter(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('renderiza el logo de Mercado Libre', () => {
    renderWithRouter(<Header />);
    const logos = screen.getAllByAltText(/mercado libre logo/i);
    expect(logos.length).toBeGreaterThan(0);
    expect(logos[0]).toHaveAttribute('src');
  });

  it('renderiza la barra de búsqueda', () => {
    renderWithRouter(<Header />);
    const searchForm = screen.getByRole('search');
    expect(searchForm).toBeInTheDocument();
  });

  it('renderiza los botones de acción', () => {
    renderWithRouter(<Header />);

    // Verifica que existen botones de acción (carrito, favoritos, etc.)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(1); // Al menos el botón de búsqueda y otros
  });

  it('tiene la estructura correcta del header', () => {
    renderWithRouter(<Header />);

    // Verifica que tiene las clases CSS principales
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-meli-yellow-light', 'meli-md:bg-meli-yellow');
  });

  it('tiene accesibilidad correcta', () => {
    renderWithRouter(<Header />);

    // Verifica que el header tiene el rol correcto
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Verifica que el logo tiene alt text
    const logos = screen.getAllByAltText(/mercado libre logo/i);
    expect(logos.length).toBeGreaterThan(0);
  });

  it('renderiza el input de búsqueda', () => {
    renderWithRouter(<Header />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renderiza el botón de búsqueda', () => {
    renderWithRouter(<Header />);
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('tiene navegación correcta', () => {
    renderWithRouter(<Header />);

    // Verifica que el logo es clickeable (navega a home)
    const logos = screen.getAllByAltText(/mercado libre logo/i);
    const logoLink = logos[0].closest('a');
    expect(logoLink).toBeInTheDocument();
  });
});
