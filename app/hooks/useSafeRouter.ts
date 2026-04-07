'use client';

import { useRouter } from 'next/navigation';

export function useSafeRouter() {
  const router = useRouter();

  const push = (path: string) => {
    const safePath = path.endsWith('/') ? path : `${path}/`;
    router.push(safePath);
  };

  const replace = (path: string) => {
    const safePath = path.endsWith('/') ? path : `${path}/`;
    router.replace(safePath);
  };

  return { push, replace };
}