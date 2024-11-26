import { useEffect, useRef } from 'react';
import SplitTextJS from '../utils/splitText';

export const useSplitText = (text) => {
  const elementRef = useRef(null);
  const splitTextRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      splitTextRef.current = new SplitTextJS(elementRef.current);
    }
  }, [text]);

  return [elementRef, splitTextRef];
};