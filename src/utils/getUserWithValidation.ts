import { getCookies } from './cookies';

interface IUser {
  id: string;
  password: string;
  name: string;
  image: string;
  create_at: number;
  update_at: number;
}

// 쿠키로부터 사용자 정보 가져오는 함수
export const getUserFromCookie = () => {
  const userInfo: IUser = getCookies('user');
  return userInfo;
};

// 로그인 실패 시 카운트 후 에러 throw
export const handleSignInError = (
  setSignInFailCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  setSignInFailCount(prevCount => prevCount + 1);
  throw new Error(
    '아이디 또는 비밀번호를 잘못 입력했습니다. 다시 입력해주세요.',
  );
};

const getUserWithValidation = (
  setSignInFailCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  const userInfo: IUser = getUserFromCookie();

  if (!userInfo) {
    handleSignInError(setSignInFailCount);
  }
  return userInfo;
};

export default getUserWithValidation;
