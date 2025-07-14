import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('retorna el valor inicial inmediatamente', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('actualiza el valor después del delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    expect(result.current).toBe('initial');

    // Cambiar el valor
    rerender({ value: 'updated', delay: 300 });
    expect(result.current).toBe('initial'); // Aún no se actualiza

    // Avanzar el tiempo
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('updated');
  });

  it('no actualiza si el valor cambia antes del delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    expect(result.current).toBe('initial');

    // Cambiar el valor
    rerender({ value: 'updated', delay: 300 });
    expect(result.current).toBe('initial');

    // Cambiar de nuevo antes del delay
    rerender({ value: 'final', delay: 300 });
    expect(result.current).toBe('initial');

    // Avanzar el tiempo
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('final');
  });

  it('funciona con diferentes delays', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 100 },
    });

    rerender({ value: 'updated', delay: 100 });

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe('updated');
  });

  it('funciona con delay de 0', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 0 },
    });

    rerender({ value: 'updated', delay: 0 });

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current).toBe('updated');
  });

  it('mantiene el valor anterior durante el delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    rerender({ value: 'updated', delay: 300 });

    // Verificar que mantiene el valor anterior durante el delay
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe('updated');
  });

  it('maneja múltiples cambios rápidos', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    // Cambios rápidos
    rerender({ value: 'first', delay: 300 });
    rerender({ value: 'second', delay: 300 });
    rerender({ value: 'third', delay: 300 });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('third');
  });

  it('funciona con valores numéricos', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 0, delay: 300 },
    });

    rerender({ value: 100, delay: 300 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe(100);
  });

  it('funciona con valores booleanos', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: false, delay: 300 },
    });

    rerender({ value: true, delay: 300 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe(true);
  });
});
