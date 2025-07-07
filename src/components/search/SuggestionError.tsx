interface SuggestionErrorProps {
  message?: string;
  onRetry: () => void;
}

export default function SuggestionError({
  message = 'Ocurrió un error al buscar.',
  onRetry,
}: SuggestionErrorProps) {
  return (
    <div className="py-4 px-6 text-center text-[#666]">
      <div className="mb-2">{message}</div>
      <button
        type="button"
        className="text-meli-blue underline text-sm hover:text-meli-blue-dark"
        onClick={onRetry}
      >
        Reintentar
      </button>
    </div>
  );
}
