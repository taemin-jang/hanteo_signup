import { FallbackProps } from 'react-error-boundary';
import Button from '../components/Button';

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <h2>{error.message}</h2>
      <Button name="다시 시도" onClick={resetErrorBoundary}></Button>
    </div>
  );
};

export default FallbackComponent;
