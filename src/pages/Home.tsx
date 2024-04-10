import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Home</h1>
      <Button name="로그인이동" onClick={() => navigate('/signin')} />
    </>
  );
};

export default Home;
