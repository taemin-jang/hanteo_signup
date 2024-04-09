import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/signin.css';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormValues {
  userID: string;
  userPW: string;
  login: string;
}

const SignIn = () => {
  const {
    register,
    formState: { errors },
    clearErrors,
    // setError,
    handleSubmit,
  } = useForm<IFormValues>({ mode: 'onChange' });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormValues> = data => {
    const { userID, userPW } = data;
    console.log(userID, userPW);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="signin">
        <div className="id_pw_wrap">
          <Input
            label="Id"
            id="id"
            type="text"
            placeholder="ID를 입력해주세요."
            errorMsg={errors.userID}
            onFocus={() => clearErrors('login')}
            {...register('userID', {
              required: 'ID를 입력해주세요.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식으로 작성해주세요.',
              },
            })}
            name="userID"
          />
          <Input
            label="Password"
            id="pw"
            type="password"
            placeholder="PW를 입력해주세요."
            errorMsg={errors.userPW}
            onFocus={() => clearErrors('login')}
            {...register('userPW', {
              required: '비밀번호를 입력해주세요',
              // pattern: {
              //   value:
              //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])(?!.*\d{3})[A-Za-z\d$@$!%*#?&]{8,13}$/,
              //   message:
              //     '숫자, 영문 대소문자, 특수 문자를 포함 및 연속된 숫자 3자리이상 금지',
              // },
            })}
            name="userPW"
          />
        </div>
        <div className="signup_signin_wrap">
          <Button name="회원가입" onClick={() => navigate('/signup')} />
          <Button type="submit" name="로그인" color="cornflowerblue" />
        </div>
      </div>
    </form>
  );
};

export default SignIn;
