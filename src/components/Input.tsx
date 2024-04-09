import React from 'react';
import '../styles/input.css';
import { FieldError } from 'react-hook-form';
import ValidateMessage from './ValidateMessage';

interface IProps {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  label: string;
  errorMsg?: FieldError;
  onFocus?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { id, name, placeholder, type, label, errorMsg, ...prop } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        ref={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        {...prop}
      />
      {errorMsg && <ValidateMessage>{errorMsg.message}</ValidateMessage>}
    </div>
  );
});

interface ImageUploadProps extends IProps {
  accept: string;
  required: boolean;
  multiple: boolean;
}

export const ImageUploadInput = React.forwardRef<
  HTMLInputElement,
  ImageUploadProps
>((props, ref) => {
  const { id, name, placeholder, type, label, ...prop } = props;
  return (
    <div>
      <label className="image_upload" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        ref={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        {...prop}
      />
    </div>
  );
});

export default Input;
