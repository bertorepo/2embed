import { useState, useEffect } from "react";

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return { isLoading };
};

export default useLoader;
