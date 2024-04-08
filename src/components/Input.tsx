import React from 'react';
import '../styles/input.css';
import { FieldError } from 'react-hook-form';
import ValidateMessage from './ValidateMessage';

interface IProps {
  id: string;
  placeholder: string;
  type: string;
  label: string;
  errorMsg?: FieldError;
  onFocus?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { id, placeholder, type, label, errorMsg, ...prop } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        ref={ref}
        id={id}
        placeholder={placeholder}
        {...prop}
      />
      {errorMsg && <ValidateMessage>{errorMsg.message}</ValidateMessage>}
    </div>
  );
});

export default Input;
