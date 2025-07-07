import { useIsMobile } from '../../hooks/useIsMobile';
import { DesktopSearchBar } from './DesktopSearchBar';
import { MobileSearchBar } from './MobileSearchBar';

export default function SearchBar(props: { onSearch?: (query: string) => void }) {
  const isMobile = useIsMobile(720);
  return isMobile ? <MobileSearchBar {...props} /> : <DesktopSearchBar {...props} />;
}
