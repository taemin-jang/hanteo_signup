import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { ImageUploadInput } from '../components/Input';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import '../styles/signup.css';
import { Cookies } from 'react-cookie';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import convertBase64 from '../utils/convertBase64';

interface IFormValues {
  imageUrl: FileList;
  userID: string;
  userPW: string;
  userPWCheck: string;
  userName: string;
  login: string;
}

const SignUp = () => {
  const {
    register,
    formState: { errors },
    clearErrors,
    watch,
    handleSubmit,
  } = useForm<IFormValues>({ mode: 'onChange' });

  const [preview, setPreview] = useState('');
  const imageUrl = watch('imageUrl');
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormValues> = async data => {
    setLoading(true);
    setTimeout(() => {
      const { imageUrl, userID, userPW, userName } = data;
      const userInfo = {
        id: userID,
        password: userPW,
        name: userName,
        image: imageUrl[0].name,
        create_at: Date.now(),
        update_at: Date.now(),
      };
      cookies.set('user', userInfo);
      setLoading(false);
      navigate('/signin');
    }, 1000);
  };

  useEffect(() => {
    const converImagetUrl = async (file: File) => {
      const url = await convertBase64(file);
      localStorage.setItem(file.name, url);
      setPreview(url);
    };
    console.log('imageurl', imageUrl);
    if (imageUrl) converImagetUrl(imageUrl[0]);
  }, [imageUrl]);

  return (
    <>
      {preview !== '' ? (
        <img src={preview} width="400px" height="400px" alt="" />
      ) : (
        <div className="default_image">이미지를 첨부해주세요.</div>
      )}
      <form className="signup_form" onSubmit={handleSubmit(onSubmit)}>
        <ImageUploadInput
          id="imageUpload"
          type="file"
          label="이미지 업로드"
          placeholder="이미지를 첨부해주세요."
          accept="image/*"
          required
          multiple
          {...register('imageUrl')}
          name="imageUrl"
        />
        <Input
          label="Id"
          id="id"
          type="text"
          placeholder="ID를 Email 형식으로 입력해주세요."
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
        <Input
          label="Password Check"
          id="pw_check"
          type="password"
          placeholder="다시 한 번 PW를 입력해주세요."
          errorMsg={errors.userPWCheck}
          onFocus={() => clearErrors('login')}
          {...register('userPWCheck', {
            required: '비밀번호를 한 번 더 입력해주세요',
            validate: (val: string) => {
              if (watch('userPW') != val) {
                return '입력한 비밀번호가 일치하지 않습니다.';
              }
            },
          })}
          name="userPWCheck"
        />
        <Input
          label="Name"
          id="name"
          type="text"
          placeholder="이름을 입력해주세요."
          errorMsg={errors.userName}
          onFocus={() => clearErrors('login')}
          {...register('userName', {
            required: '이름을 입력해주세요',
            pattern: {
              value: /^.{0,5}$/,
              message: '이름의 최대 길이는 5글자입니다.',
            },
          })}
          name="userName"
        />
        <Button type="submit" name="회원가입" color="cornflowerblue">
          {loading && <Spinner />}
        </Button>
      </form>
    </>
  );
};

export default SignUp;
