import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { pageView } from './page-view';

export const useAppInit = () => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', pageView);
    return () => router.events.off('routeChangeComplete', pageView);
  }, [router]);
};

