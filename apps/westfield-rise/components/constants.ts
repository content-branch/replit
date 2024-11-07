import { useEffect } from 'react';

export function useInfiniteScroll(callback: () => void) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const threshold = windowHeight * 0.85;

      if (scrollY + windowHeight >= documentHeight - threshold) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback]);
}
