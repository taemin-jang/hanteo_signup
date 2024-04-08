import '../styles/button.css';

interface IProps {
  name: string;
  color?: 'skyblue' | 'cornflowerblue' | 'lightpink';
  handler?: () => void;
}

const Button = (props: IProps) => {
  const { name, color = 'skyblue', handler } = props;
  return (
    <>
      <button style={{ backgroundColor: `${color}` }} onClick={handler}>
        {name}
      </button>
    </>
  );
};

export default Button;
