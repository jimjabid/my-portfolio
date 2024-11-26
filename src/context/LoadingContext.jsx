import { createContext, useState, useEffect } from "react";

export const LoadingContext = createContext({
  isLoading: true,
  animationsComplete: false,
  setIsLoading: () => {},
  setAnimationsComplete: () => {},
});

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [animationsComplete, setAnimationsComplete] = useState(false);

  // Debug log
  useEffect(() => {
    console.log('Loading State:', { isLoading, animationsComplete });
  }, [isLoading, animationsComplete]);

  return (
    <LoadingContext.Provider 
      value={{ 
        isLoading, 
        animationsComplete,
        setIsLoading, 
        setAnimationsComplete 
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
