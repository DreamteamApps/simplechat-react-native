import {useEffect} from 'react';

export const useDebounce = (callback, delay, value) => {
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [value]);
};
