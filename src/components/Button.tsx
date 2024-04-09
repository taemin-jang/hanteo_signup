import '../styles/button.css';

interface IProps {
  name: string;
  type?: 'button' | 'submit' | 'reset';
  color?: 'skyblue' | 'cornflowerblue' | 'lightpink';
  onClick?: () => void;
}

const Button = (props: IProps) => {
  const { name, type = 'button', color = 'skyblue', onClick } = props;
  return (
    <>
      <button
        type={type}
        style={{ backgroundColor: `${color}` }}
        onClick={onClick}
      >
        {name}
      </button>
    </>
  );
};

export default Button;
