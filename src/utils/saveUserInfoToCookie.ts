import { QueryClient } from '@tanstack/react-query';
import { setCookies } from './cookies';

interface IUser {
  id: string;
  password: string;
  name: string;
  image: string;
  create_at: number;
  update_at: number;
}

interface ISignUpFormValues {
  imageUrl: FileList;
  userID: string;
  userPW: string;
  userPWCheck: string;
  userName: string;
  login: string;
}

interface IMypageFormValues {
  imageUrl: FileList;
  userID: string;
  createAt: string;
  updateAt: string;
  userName: string;
  login: string;
}

type FormValues = ISignUpFormValues | IMypageFormValues;

const saveUserInfoToCookie = (
  queryClient: QueryClient,
  formData: FormValues,
  queryData?: IUser,
) => {
  let userInfo = {} as IUser;

  if ('userPW' in formData) {
    userInfo = {
      id: formData.userID,
      password: formData.userPW,
      name: formData.userName,
      image: formData.imageUrl[0].name,
      create_at: Date.now(),
      update_at: Date.now(),
    };
  } else if (queryData) {
    userInfo = {
      ...queryData,
      name: formData.userName,
      image: formData.imageUrl[0]?.name ?? queryData.image,
      update_at: Date.now(),
    };
  }

  setCookies('user', userInfo);
  queryClient.setQueryData(['user'], userInfo);
};

export default saveUserInfoToCookie;
