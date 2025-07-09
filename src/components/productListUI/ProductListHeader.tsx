import SortButton from './SortButton';
import FilterButton from './FilterButton';
import BestInstallmentToggle from './BestInstallmentToggle';

export default function ProductListHeader() {
  return (
    <div className="block meli-md:hidden bg-white px-1 border-b border-gray-100">
      <div
        className="flex items-center justify-between relative"
        style={{ borderBottom: '1px solid rgba(0, 0, 0, .07)' }}
      >
        <div className="flex-1 flex items-center justify-center relative">
          <SortButton />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-5 border-r border-gray-300" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <FilterButton />
        </div>
      </div>
      <BestInstallmentToggle />
    </div>
  );
}
