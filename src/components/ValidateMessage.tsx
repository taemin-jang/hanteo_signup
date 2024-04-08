import '../styles/validateMessage.css';

interface IProps {
  children: React.ReactNode;
}

const ValidateMessage = (props: IProps) => {
  const { children } = props;
  return <p>{children}</p>;
};

export default ValidateMessage;
