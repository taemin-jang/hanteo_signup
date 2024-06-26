import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { ImageUploadInput } from '../components/Input';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import '../styles/mypage.css';
import Spinner from '../components/Spinner';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import getDate from '../utils/getDate';
import { useNavigate } from 'react-router-dom';
import { getUserFromCookie } from '../utils/getUserWithValidation';
import useConvertImage from '../hooks/useConvertImageUrl';
import saveUserInfoToCookie from '../utils/saveUserInfoToCookie';

interface IFormValues {
  imageUrl: FileList;
  userID: string;
  createAt: string;
  updateAt: string;
  userName: string;
  login: string;
}

const Mypage = () => {
  const {
    register,
    formState: { errors },
    clearErrors,
    setValue,
    watch,
    handleSubmit,
  } = useForm<IFormValues>({ mode: 'onChange' });

  const query = useSuspenseQuery({
    queryKey: ['user'],
    queryFn: () => getUserFromCookie(),
  });
  const data = query.data;
  const saveImageUrl: string = localStorage.getItem(data.image) || '';
  const [preview, setPreview] = useState('');
  const imageUrl = watch('imageUrl');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useConvertImage(imageUrl, setPreview);

  useEffect(() => {
    setValue('userID', data.id);
    setValue('userName', data.name);
    setValue('createAt', getDate(new Date(data.create_at)));
    setValue('updateAt', getDate(new Date(data.update_at)));
  }, [data.update_at]);

  const onSubmit: SubmitHandler<IFormValues> = async formData => {
    setLoading(true);
    setTimeout(async () => {
      saveUserInfoToCookie(queryClient, formData, data);

      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {preview !== '' ? (
        <img src={preview} width="400px" height="400px" alt="" />
      ) : (
        <img src={saveImageUrl} width="400px" height="400px" alt="" />
      )}
      <form className="mypage_form" onSubmit={handleSubmit(onSubmit)}>
        <ImageUploadInput
          id="imageUpload"
          type="file"
          label="이미지 업로드"
          placeholder="이미지를 첨부해주세요."
          accept="image/*"
          multiple
          {...register('imageUrl')}
          name="imageUrl"
        />
        <Input
          label="Id"
          id="id"
          type="text"
          placeholder=""
          {...register('userID')}
          name="userID"
          disabled
        />

        <Input
          label="이름"
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

        <Input
          label="가입 일시"
          id="create_at"
          type="text"
          placeholder=""
          {...register('createAt')}
          name="createAt"
          disabled
        />
        <Input
          label="수정 일시"
          id="update_at"
          type="text"
          placeholder=""
          {...register('updateAt')}
          name="updateAt"
          disabled
        />
        <div className="mypage_button_wrap">
          <Button
            type="submit"
            name="로그아웃"
            color="lightpink"
            onClick={() => navigate('/signin')}
          />
          <Button type="submit" name="수정" color="cornflowerblue">
            {loading && <Spinner />}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Mypage;
