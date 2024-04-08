import '../styles/input.css';

interface IProps {
  id: string;
  placeholder: string;
  type: string;
  label: string;
  handler?: () => void;
}

const Input = (props: IProps) => {
  const { id, placeholder, type, label } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder} />
    </div>
  );
};

export default Input;
