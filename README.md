# React Query 를 사용한 회원 가입 페이지 구현

## 프로젝트 설명

한터글로벌 서비스개발실 프론트엔드의 코딩 테스트로, React-Query를 사용한 회원 가입 페이지 구현해보는 과제입니다.

## 프로젝트 실행 방법

로컬 환경 실행

```Bash
git clone https://github.com/taemin-jang/hanteo_signup.git
cd hanteo_signup
npm install
npm run dev
```

## 경로

- `localhost:5173` : 홈 페이지
- `localhost:5173/signin` : 로그인 페이지
- `localhost:5173/signup` : 회원가입 페이지
- `localhost:5173/mypage` : 회원 정보 조회 페이지

## 프로젝트 폴더구조

```
📦hanteo_signup
 ┣ 📂public
 ┣ 📂src              소스 코드가 있는 폴더입니다.
 ┃ ┣ 📂assets         이미지, 폰트 등의 정적 파일이 있는 폴더입니다.
 ┃ ┣ 📂components     리액트 컴포넌트들이 있는 폴더입니다.
 ┃ ┣ 📂hooks          Custom Hooks이 있는 폴더입니다.
 ┃ ┣ 📂pages          페이지별 컴포넌트들이 있는 폴더입니다.
 ┃ ┣ 📂styles         스타일 CSS 파일이 있는 폴더입니다.
 ┗ ┗ 📂utils          유틸리티 함수들이 있는 폴더입니다.
```

## 개발 환경

- React 18, TypeScript, React-Query(TanStack-Query v5), React-Hook-Form, Vite
- 정적 타입 시스템을 통한 코드 유지보수와 개발 성능 향상을 위해 TypeScript를 사용했습니다.

## Commit Convention

| Type     | Description                                                        |
| -------- | ------------------------------------------------------------------ |
| Feat     | 새로운 기능 추가                                                   |
| Fix      | 버그 수정                                                          |
| Modify   | 파일/폴더 수정/삭제/위치 변경                                      |
| Style    | CSS 등 사용자 UI/UX 디자인 변경                                    |
| Refactor | 코드 리팩토링                                                      |
| Docs     | 문서 수정                                                          |
| Comment  | 필요한 주석 추가 및 변경                                           |
| Test     | 테스트 코드 추가                                                   |
| Chore    | 빌드 업무 수정, 패키지 관리자 구성 업데이트 등 환경 설정 관련 사항 |

## 구현 내용

### 통신에러

![통신에러](https://github.com/taemin-jang/hanteo_signup/assets/82078896/b7b65f68-1de7-4719-9632-931af863d5f6)

- 동일한 ID로 3번 이상 회원 가입 시도할 경우 통신 에러 발생
- 통신 에러 발생할 경우 테스트하기 위해 1분간 서비스 이용 불가능한 에러 페이지로 이동
- 카운트가 3회 이상일 경우 쿠키 추가
- 관련 코드

```ts
// 이전에 가입한 아이디와 현재 가입한 아이디가 다를 경우 카운트 초기화
if (prevId !== data.userID) {
  removeCookies('reqCount');
  reqCount = 0;
}

// 요청한 카운트가 3회 이상일 경우 CommunicationError 쿠키 추가 (maxAge : 1분) 및 에러 페이지 이동
if (reqCount >= 3) {
  setErrorCookies('CommunicationError', true);
  showBoundary({
    code: 403,
    message:
      '🚨동일한 ID로 회원 가입 횟수 초과로 1분간 서비스를 이용할 수 없습니다.🚨',
  });
  return;
}

setCookies('reqCount', reqCount + 1);
```

### 해상도 에러

![해상도에러](https://github.com/taemin-jang/hanteo_signup/assets/82078896/eb8ef077-efad-4ce9-8b3d-18f9af97e43b)

- 해상도가 320px ~ 770px(모바일 해상도) 이외 접근할 경우 해상도 에러 발생
- resize 이벤트 발생 시 처리하는 useResolution Custom Hook
- 관련 코드

```tsx
const useResolution = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleResolution = () => {
      const width = window.innerWidth;
      if (width < 320 || width > 770) {
        setError(true);
      } else {
        setError(false);
      }
    };

    // window 객체에 resize 이벤트 발생 시 handleResolution 핸들러 설정
    window.addEventListener('resize', handleResolution);
    handleResolution();

    // cleanup 함수로 unmount 되는 시점에 등록된 이벤트 제거
    return () => {
      window.removeEventListener('resize', handleResolution);
    };
  }, []);

  return error;
};
```

### 전역에러

![전역에러](https://github.com/taemin-jang/hanteo_signup/assets/82078896/77bc323c-508d-4716-b4a9-42d386615a0b)

- 로그인 실패할 경우 Alert 창 노출
- 로그인 실패 3회 이상 할 경우 전역 에러 발생
- 전역 에러 발생 시 쿠키 추가
- 관련 코드

```ts
useEffect(() => {
  // 로그인 실패 횟수가 3번 이상일 경우
  if (singInFailCount >= 3) {
    // 쿠키 추가
    setErrorCookies('signinNotAccess', true);
    // 에러 창 이동
    showBoundary({
      code: 401,
      message: '🚨로그인 시도 횟수 초과로 1분간 서비스를 이용할 수 없습니다.🚨',
    });
  }
}, [singInFailCount]);
```

### 회원가입

![회원가입](https://github.com/taemin-jang/hanteo_signup/assets/82078896/0ba60674-bdc2-460a-8899-7f44888e114c)

- 이미지, ID(Email), Password, Password Check, Name 입력 받는 폼으로 구성
- 회원 정보 데이터 모델
  - 아이디 - 이메일 형식
  - 비밀번호 - 숫자, 영문-소, 영문-대, 특수문자 포함, 연속된 숫자 3개 이상 금지
  - 이름 - 최대 5글자
  - 이미지 - 파일명만 저장
  - 가입일시 - yyyy.mm.dd hh:ii:ss
  - 수정일시 - yyyy.mm.dd hh:ii:ss
- 이미지 업로드 시 미리보기 구현 및 이미지는 Base64로 변환 후 localStorage에 저장
- 회원 가입 시 유효성 검사 라이브 체크 후 필요한 메시지 출력
- 폼 양식에 맞게 값 입력 후 회원 가입 버튼 클릭 시 1초 이상 지연될 경우 로딩 Spinner 구현
- 회원 가입 성공 시 로그인 페이지로 이동
- `QueryClient.setQueryData`를 이용하여 캐시 업데이트

### 로그인

![로그인](https://github.com/taemin-jang/hanteo_signup/assets/82078896/21494d78-8a2b-46f2-81db-4649983150e9)

- 유효성 검사 구현
  - 아이디는 이메일 형식
  - 비밀번호는 13자리 이하이며, 숫자, 영문-대, 영문-소, 특수문자 포함, 연속된 숫자 3자리 이상 금지
- 사용자 입력 시 라이브 체크 후 필요한 메시지 출력
- 사용자 로그인 실패 시 Alert 창 출력
- 로그인 성공 시 회원 조회 페이지로 이동

### 회원 정보 조회 페이지

![회원조회페이지](https://github.com/taemin-jang/hanteo_signup/assets/82078896/9112ca6e-fddc-436e-8a15-e5693e6a474f)

- 이미지, ID(Email), Name, Create_At, Update_At 입력 받는 폼으로 구성
- `useSuspenseQuery`로 조회한 사용자 정보에서 이미지 파일 명으로 localStorage에 저장한 이미지 불러옴
- 이미지와 이름은 수정 가능하고 그 외는 변경 불가능
- 회원 정보 수정 시 수정 일시만 변경됨
- 수정 시 `queryClient.setQueryData`를 통해 캐시 업데이트
- 로그아웃 시 로그인 페이지로 이동

## Trouble Shooting

### localStorage에 저장한 로컬 이미지 로드 되지 않는 문제

초기 로컬 이미지를 input 태그로 받은 뒤 File 객체를 Url로 변경하기 위해 `window.createObjectURL(file)`과 같이 변환해서 저장했습니다.

이후 회원 정보 조회 페이지에서 저장한 이미지를 사용하면 이미지가 로드되지 않았습니다.

그 이유는 브라우저 메모리에 이미지 파일을 저장하는 것으로 브라우저가 새로고침되거나 닫히면 이미지 URL도 같이 사용할 수 없게 됩니다. 즉, `createObjectURL`은 브라우저와 생명주기가 같습니다.

새로고침이나 닫지 않고 `createObjectURL`로 저장한 이미지를 바로 회원 정보 조회 페이지에서 조회하면 구현했다고 볼 수 있지만, 영구적으로 보관되는 URL로 구현하고 싶었습니다.

이미지 파일 2진 데이터를 base64로 인코딩하여 이 문제를 해결할 수 있었습니다.

base64로 인코딩하기 위해 유틸함수인 `convertBase64`를 만들었습니다.

```ts
const convertBase64 = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
    };
  });
};
```

이렇게 만들어진 base64 data URL을 localStorage에 저장하여 삭제하지 않는한 사용할 수 있도록 구현했습니다.

### localStorage에 저장 시 용량 초과 문제

localStorage에 이미지를 업로드하거나 수정할 때마다 이미지 파일 명을 key, base64로 인코딩된 data URL을 값으로 해서 저장하고 있었습니다.

그러던 중 파일이 큰 이미지를 추가할 때 localStorage에서 Error가 발생하였고, 그 이유는 용량 초과 때문이었습니다.

구글 Chrome localStorage를 사용중이었고, 해당 localStorage의 용량은 10MB였는데 이미지 data URL을 계속 저장하다보니 초과한 상황이었습니다.

회원 정보 조회 페이지에서는 하나의 이미지, 현재 사용자 데이터 모델에 등록된 이미지만 사용하기 때문에 그 외에 이미지는 필요가 없는 데이터로써 계속 쌓이고 있었습니다.

따라서 이미지 첨부, 수정하기 전 `localStorage.clear()`을 먼저 처리한 뒤 저장함으로써 해당 문제를 해결할 수 있었습니다.

해당 로직을 수행하는 useConvertImageUrl Custom Hook을 만들어서 사용했습니다.

```tsx
const useConvertImage = (
  imageUrl: FileList,
  setPreview: React.Dispatch<React.SetStateAction<string>>,
) => {
  useEffect(() => {
    const convertImagetUrl = async (file: File) => {
      const url = await convertBase64(file);
      localStorage.clear();
      localStorage.setItem(file.name, url);
      setPreview(url);
    };

    if (imageUrl?.length) {
      convertImagetUrl(imageUrl[0]);
    }
  }, [imageUrl]);
};
```

### useSuspenseQuery를 사용한 이유

회원 정보 조회 페이지(mypage)에서 로그인한 사용자 정보를 조회할 때 useSuspenseQuery를 사용했습니다.

그 이유는 useQuery와 useSuspenseQuery의 차이점으로 데이터 반환 방식이 다르기 때문입니다.

useQuery는 기본적으로 비동기로 동작하여 데이터가 보장되지 않습니다.

useSuspenseQuery는 동기적으로 동작하기 때문에 데이터가 보장됩니다.

로그인한 사용자의 정보를 조회하기에 사용자 정보가 반드시 존재한다고 가정했고, useSuspenseQuery를 사용해 데이터와 에러 핸들링 코드를 줄일 수 있다고 판단해 사용했습니다.
