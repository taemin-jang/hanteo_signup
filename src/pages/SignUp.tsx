import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { ImageUploadInput } from '../components/Input';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import '../styles/signup.css';
// import { useState } from 'react';

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
    // setError,
    watch,
    handleSubmit,
  } = useForm<IFormValues>({ mode: 'onChange' });

  const [preview, setPreview] = useState('');
  const imageUrl = watch('imageUrl');

  const onSubmit: SubmitHandler<IFormValues> = data => {
    const { imageUrl } = data;
    console.log(imageUrl);
  };

  useEffect(() => {
    let url = '';
    if (imageUrl && imageUrl.length) {
      const file = imageUrl[0];
      url = window.URL.createObjectURL(file);
      setPreview(url);
    }

    return () => {
      window.URL.revokeObjectURL(url);
    };
  }, [imageUrl]);

  return (
    <>
      {preview !== '' ? (
        <img src={preview} width="400px" height="400px" alt="" />
      ) : (
        <div className="default_image">이미지를 첨부해주세요.</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
          })}
          name="userName"
        />
        <Button type="submit" name="회원가입" color="cornflowerblue" />
      </form>
    </>
  );
};

export default SignUp;
