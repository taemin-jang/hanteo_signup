import { useEffect, useState } from 'react';

const useResolution = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleResolution = () => {
      const width = window.innerWidth;
      if (width < 320 || width > 770) {
        setError(true);
      } else {
        setError(false);
      }
    };

    window.addEventListener('resize', handleResolution);
    handleResolution();
    return () => {
      window.removeEventListener('resize', handleResolution);
    };
  }, []);

  return error;
};

export default useResolution;
