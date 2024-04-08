import '../styles/button.css';

interface IProps {
  name: string;
  type?: 'button' | 'submit' | 'reset';
  color?: 'skyblue' | 'cornflowerblue' | 'lightpink';
  handler?: () => void;
}

const Button = (props: IProps) => {
  const { name, type = 'button', color = 'skyblue', handler } = props;
  return (
    <>
      <button
        type={type}
        style={{ backgroundColor: `${color}` }}
        onClick={handler}
      >
        {name}
      </button>
    </>
  );
};

export default Button;
