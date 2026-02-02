'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  const showNavigation = pathname !== '/';

  if (!showNavigation) return null;
  
  return <Navigation />;
}
