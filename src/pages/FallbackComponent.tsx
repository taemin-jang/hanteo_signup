import { FallbackProps } from 'react-error-boundary';
import Button from '../components/Button';
import useResolution from '../hooks/useResolution';
import { useEffect } from 'react';

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  const resolutionError = useResolution();
  useEffect(() => {
    // 지원되는 해상도로 변경 시 Error 초기화
    if (!resolutionError) resetErrorBoundary();
  });
  return (
    <div>
      <h2>{error.message}</h2>
      <Button name="다시 시도" onClick={resetErrorBoundary}></Button>
    </div>
  );
};

export default FallbackComponent;
