import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

const CheckResolution = () => {
  const [error, setError] = useState(false);
  const { showBoundary } = useErrorBoundary();
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

  if (error) {
    showBoundary({
      code: 415,
      message: '🚨지원하지 않는 해상도입니다. 모바일 해상도로 접속해주세요.🚨',
    });
  }

  return <Outlet />;
};

export default CheckResolution;
