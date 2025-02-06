import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useUserStore} from '../../../store/store';
import {validateId, validatePwd} from '../../../utils/Validation';
import InitialLayout from './InitialLayout';

// 연속 5회 설정한 비밀번호가 틀렸을 경우 30분간 잠금
// 토큰값 있으면 리다이렉트
export default function SignInContainer() {
  const navigate = useNavigate();
  const {role} = useUserStore();

  const [id, setId] = useState('');
  const [idError, setIdError] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');

  const idChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);

    if (value === '') {
      setIdError('아이디를 입력해주세요.');
    } else if (!validateId(value)) {
      setIdError('아이디는 영어 소문자와 점(.)을 포함한 3~15자여야 합니다.');
    } else {
      setIdError('');
    }
  };

  const pwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(value);

    if (value === '') {
      setPwdError('비밀번호를 입력해주세요.');
    } else if (!validatePwd(value)) {
      setPwdError('비밀번호는 영문, 숫자, 특수문자가 조합된 6~32자여야 합니다.');
    } else {
      setPwdError('');
    }
  };

  const onClickLogin = () => {
    if (id === '') {
      setIdError('아이디를 입력해주세요.');
      return;
    } else if (!validateId(id)) {
      setIdError('아이디는 영어 소문자와 점(.)을 포함한 3~15자여야 합니다.');
      return;
    }

    if (pwd === '') {
      setPwdError('비밀번호를 입력해주세요.');
      return;
    } else if (!validatePwd(pwd)) {
      setPwdError('비밀번호는 영문, 숫자, 특수문자가 조합된 6~32자여야 합니다.');
      return;
    }
    const requestData = {
      id,
      pwd,
    };

    // todo 로그인 모달 추가 및 페이지 이동
    console.log(requestData);

    // 로그인 성공 여부 로직 -> setRole 후 페이지 이동
    // 최초 로그인 여부에 따라 페이지 이동 -> 비밀번호 변경은 토큰 값 필요
    const isFirstLogin = false;
    if (isFirstLogin) {
      navigate('/changepwd');
    } else {
      navigate(`/${role}`, {replace: true});
    }
  };

  return (
    // <div className="flex h-screen">
    //   <div className="top-container items-center">
    <InitialLayout>
      <div className="w-full absolute right-0 top-0 min-h-screen flex items-center justify-center">
        <div className="flex flex-col justify-center items-start gap-10 w-[400px]">
          <p className="w-full text-center text-black text-2xl font-bold">로그인</p>
          <div className="flex flex-col w-full gap-5">
            {/* 아이디 */}
            <div className="id">
              <input
                id="id"
                autoComplete="id"
                type="text"
                value={id}
                onChange={idChange}
                placeholder="아이디를 입력하세요"
                required
                className={`py-3 px-4 text-subtitle-regular w-full border rounded-md focus:outline-none 
                ${idError ? 'border-error' : 'border-gray-2 focus:border-main'}`}
              />
              <div className={`flex relative text-error text-xs mt-1 ${idError ? '' : 'hidden'}`}>{idError}</div>
            </div>
            {/* 비밀번호 */}
            <div className="password">
              <input
                id="password"
                autoComplete="password"
                type="password"
                value={pwd}
                onChange={pwdChange}
                placeholder="비밀번호를 입력하세요"
                required
                className={`py-3 px-4 text-subtitle-regular w-full border rounded-md focus:outline-none 
                ${pwdError ? 'border-error' : 'border-gray-2 focus:border-main'}`}
              />
              <div className={`flex relative text-error text-xs mt-1 ${pwdError ? '' : 'hidden'}`}>{pwdError}</div>
            </div>
          </div>
          {/* 버튼 */}
          <button onClick={onClickLogin} className=" w-full main-btn-lg">
            로그인
          </button>
          <div className="flex justify-between px-16 w-full">
            <Link to="/signup" className="cursor-pointer hover:underline hover:text-gray-15">계정 등록 신청</Link>
            <Link to="/resetpwd" className="cursor-pointer hover:underline hover:text-gray-15">비밀번호 재설정</Link>
          </div>
        </div>
      </div>
    </InitialLayout>
    // </div>
  );
}
