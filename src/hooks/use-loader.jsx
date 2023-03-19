import { useState, useEffect } from "react";

const useLoader = (dependency = null) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dependency]);
  return { isLoading };
};

export default useLoader;
