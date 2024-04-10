import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/signin.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import ValidateMessage from '../components/ValidateMessage';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { getCookies, setErrorCookies } from '../utils/cookies';

interface IUser {
  id: string;
  password: string;
  name: string;
  image: string;
  create_at: number;
  update_at: number;
}

const getUser = (
  setSignInFailCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  const userInfo: IUser = getCookies('user');
  if (!userInfo) {
    setSignInFailCount(prevCount => prevCount + 1);
    throw new Error(
      '아이디 또는 비밀번호를 잘못 입력했습니다. 다시 입력해주세요.',
    );
  }
  return userInfo;
};

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
    handleSubmit,
  } = useForm<IFormValues>({ mode: 'onChange' });
  const [singInFailCount, setSignInFailCount] = useState(0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showBoundary } = useErrorBoundary();

  const onSubmit: SubmitHandler<IFormValues> = async data => {
    const { userID, userPW } = data;
    try {
      const query = await queryClient.fetchQuery({
        queryKey: ['user'],
        queryFn: () => getUser(setSignInFailCount),
      });

      if (userID !== query.id || userPW !== query.password) {
        setSignInFailCount(prevCount => prevCount + 1);
        throw new Error(
          '아이디 또는 비밀번호를 잘못 입력했습니다. 다시 입력해주세요.',
        );
      }

      navigate('/mypage');
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      alert(message);
    }
  };

  useEffect(() => {
    if (singInFailCount >= 3) {
      setErrorCookies('signinNotAccess', true);
      showBoundary({
        code: 401,
        message:
          '🚨로그인 시도 횟수 초과로 1분간 서비스를 이용할 수 없습니다.🚨',
      });
    }
  }, [singInFailCount]);

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
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])(?!.*\d{3})[A-Za-z\d$@$!%*#?&]{8,13}$/,
                message:
                  '숫자, 영문 대소문자, 특수 문자를 포함 및 연속된 숫자 3자리이상 금지',
              },
            })}
            name="userPW"
          />
        </div>
        {errors.login && (
          <ValidateMessage>{errors.login.message}</ValidateMessage>
        )}
        <div className="signup_signin_wrap">
          <Button name="회원가입" onClick={() => navigate('/signup')} />
          <Button type="submit" name="로그인" color="cornflowerblue" />
        </div>
      </div>
    </form>
  );
};

export default SignIn;
