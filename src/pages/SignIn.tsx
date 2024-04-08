import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/signin.css';

const SignIn = () => {
  return (
    <div className="signin">
      <div className="id_pw_wrap">
        <Input
          label="Id"
          id="id"
          type="text"
          placeholder="ID를 입력해주세요."
        />
        <Input
          label="Password"
          id="pw"
          type="password"
          placeholder="PW를 입력해주세요."
        />
      </div>
      <div className="signup_signin_wrap">
        <Button name="회원가입" />
        <Button name="로그인" color="cornflowerblue" />
      </div>
    </div>
  );
};

export default SignIn;
