import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

const CheckResolution = () => {
  const [error, setError] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const cookies = new Cookies();
  const isSignInAccess = cookies.get('signinNotAccess');
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

  if (isSignInAccess) {
    showBoundary({
      code: 401,
      message: '🚨로그인 시도 횟수 초과로 1분간 서비스를 이용할 수 없습니다.🚨',
    });
  }

  if (error) {
    showBoundary({
      code: 415,
      message: '🚨지원하지 않는 해상도입니다. 모바일 해상도로 접속해주세요.🚨',
    });
  }

  return <Outlet />;
};

export default CheckResolution;
