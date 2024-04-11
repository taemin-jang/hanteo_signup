import { useErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { getCookies } from '../utils/cookies';
import useResolution from '../hooks/useResolution';

const CheckResolution = () => {
  const resolutionError = useResolution();
  const { showBoundary } = useErrorBoundary();
  const isSignInAccess = getCookies('signinNotAccess');
  const isCommunicationError = getCookies('CommunicationError');

  if (isSignInAccess) {
    showBoundary({
      code: 401,
      message: '🚨로그인 시도 횟수 초과로 1분간 서비스를 이용할 수 없습니다.🚨',
    });
  }

  if (isCommunicationError) {
    showBoundary({
      code: 403,
      message:
        '🚨동일한 ID로 회원 가입 횟수 초과로 1분간 서비스를 이용할 수 없습니다.🚨',
    });
  }
  if (resolutionError) {
    showBoundary({
      code: 415,
      message: '🚨지원하지 않는 해상도입니다. 모바일 해상도로 접속해주세요.🚨',
    });
  }

  return <Outlet />;
};

export default CheckResolution;
