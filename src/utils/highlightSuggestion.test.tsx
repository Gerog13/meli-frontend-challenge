import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { highlightSuggestion } from './highlightSuggestion';

describe('highlightSuggestion', () => {
  it('resalta texto que empieza con el query', () => {
    const suggestion = 'iPhone 13';
    const query = 'iPhone';

    render(highlightSuggestion(suggestion, query));

    const highlightedText = screen.getByText('13');
    expect(highlightedText).toBeInTheDocument();
    expect(highlightedText).toHaveClass('font-semibold');
  });

  it('no resalta cuando no empieza con el query', () => {
    const suggestion = 'iPhone 13';
    const query = '13';

    render(highlightSuggestion(suggestion, query));

    const text = screen.getByText('iPhone 13');
    expect(text).toBeInTheDocument();
    expect(text).not.toHaveClass('font-semibold');
  });

  it('no resalta cuando no hay coincidencia', () => {
    const suggestion = 'iPhone 13';
    const query = 'Samsung';

    render(highlightSuggestion(suggestion, query));

    const text = screen.getByText('iPhone 13');
    expect(text).toBeInTheDocument();
    expect(text).not.toHaveClass('font-semibold');
  });

  it('maneja query vacío', () => {
    const suggestion = 'iPhone 13';
    const query = '';

    render(highlightSuggestion(suggestion, query));

    const text = screen.getByText('iPhone 13');
    expect(text).toBeInTheDocument();
    expect(text).not.toHaveClass('font-semibold');
  });

  it('maneja suggestion vacío', () => {
    const suggestion = '';
    const query = 'iPhone';

    const { container } = render(highlightSuggestion(suggestion, query));
    expect(container.firstChild).toBeNull();
  });

  it('es case insensitive', () => {
    const suggestion = 'iPhone 13';
    const query = 'iphone';

    render(highlightSuggestion(suggestion, query));

    const highlightedText = screen.getByText('13');
    expect(highlightedText).toBeInTheDocument();
    expect(highlightedText).toHaveClass('font-semibold');
  });

  it('resalta con query en mayúsculas', () => {
    const suggestion = 'iphone 13';
    const query = 'IPHONE';

    render(highlightSuggestion(suggestion, query));

    const highlightedText = screen.getByText('13');
    expect(highlightedText).toBeInTheDocument();
    expect(highlightedText).toHaveClass('font-semibold');
  });

  it('maneja caracteres especiales', () => {
    const suggestion = 'iPhone-13 Pro';
    const query = 'iPhone-13';

    render(highlightSuggestion(suggestion, query));

    const highlightedText = screen.getByText('Pro');
    expect(highlightedText).toBeInTheDocument();
    expect(highlightedText).toHaveClass('font-semibold');
  });

  it('maneja espacios en el query', () => {
    const suggestion = 'iPhone 13 Pro Max';
    const query = 'iPhone 13';

    render(highlightSuggestion(suggestion, query));

    const highlightedText = screen.getByText('Pro Max');
    expect(highlightedText).toBeInTheDocument();
    expect(highlightedText).toHaveClass('font-semibold');
  });

  it('resalta solo la parte que no coincide', () => {
    const suggestion = 'iPhone 13 Pro Max';
    const query = 'iPhone';

    render(highlightSuggestion(suggestion, query));

    const highlightedText = screen.getByText('13 Pro Max');
    expect(highlightedText).toBeInTheDocument();
    expect(highlightedText).toHaveClass('font-semibold');
  });

  it('maneja query más largo que suggestion', () => {
    const suggestion = 'iPhone';
    const query = 'iPhone 13 Pro Max';

    render(highlightSuggestion(suggestion, query));

    const text = screen.getByText('iPhone');
    expect(text).toBeInTheDocument();
    expect(text).not.toHaveClass('font-semibold');
  });
});
