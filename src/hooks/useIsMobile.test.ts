import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useIsMobile } from './useIsMobile';

describe('useIsMobile', () => {
  beforeEach(() => {
    // Reset window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('retorna false para pantallas desktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(false);
  });

  it('retorna true para pantallas mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(true);
  });

  it('funciona con diferentes breakpoints', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });

    const { result } = renderHook(() => useIsMobile(1024));
    expect(result.current).toBe(true);
  });

  it('funciona con breakpoint de 720px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile(720));
    expect(result.current).toBe(true);
  });

  it('funciona con breakpoint de 480px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile(480));
    expect(result.current).toBe(false);
  });

  it('funciona con breakpoint por defecto', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('maneja múltiples instancias del hook', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result: result1 } = renderHook(() => useIsMobile(768));
    const { result: result2 } = renderHook(() => useIsMobile(1024));

    expect(result1.current).toBe(true);
    expect(result2.current).toBe(true);
  });

  it('funciona con breakpoint de 0px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 100,
    });

    const { result } = renderHook(() => useIsMobile(0));
    expect(result.current).toBe(false);
  });

  it('funciona con breakpoint muy alto', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile(2000));
    expect(result.current).toBe(true);
  });

  it('funciona con ancho exacto del breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(false);
  });
});
