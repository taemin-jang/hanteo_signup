import '../styles/button.css';

interface IProps {
  name: string;
  type?: 'button' | 'submit' | 'reset';
  color?: 'skyblue' | 'cornflowerblue' | 'lightpink';
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: IProps) => {
  const {
    name,
    type = 'button',
    color = 'skyblue',
    children,
    onClick,
    ...prop
  } = props;
  return (
    <>
      <button
        type={type}
        style={{ backgroundColor: `${color}` }}
        onClick={onClick}
        {...prop}
      >
        {children ? children : name}
      </button>
    </>
  );
};

export default Button;
