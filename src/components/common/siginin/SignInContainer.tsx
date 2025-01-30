import {useState} from 'react';
import InitialTopBar from './InitialTopBar';
import ToggleBtn from '../ToggleBtn';
import {useNavigate} from 'react-router-dom';
import {useUserStore} from '../../../store/store';

// todo 연속 5회 설정한 비밀번호가 틀렸을 경우 30분간 잠금

export default function SignInContainer() {
  const navigate = useNavigate();
  const {role} = useUserStore();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');

  const [autoLogin, setAutoLogin] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 유효성 검사 정규식
    return emailRegex.test(email);
  };

  // 비밀번호 정규식 (영문, 숫자, 특수문자 포함, 6~32자)
  const validatePwd = (password: string) => {
    const pwdRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,32}$/;
    return pwdRegex.test(password);
  };

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value === '') {
      setEmailError('이메일을 입력해주세요.');
    } else if (!validateEmail(value)) {
      setEmailError('잘못된 이메일 주소입니다. 이메일 주소를 정확하게 입력해주세요.');
    } else {
      setEmailError('');
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
    if (email === '') {
      setEmailError('이메일을 입력해주세요.');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('잘못된 이메일 주소입니다. 이메일 주소를 정확하게 입력해주세요.');
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
      autoLogin,
      email,
      pwd,
    };

    // todo 로그인 모달 추가 및 페이지 이동
    console.log(requestData);

    // 로그인 성공 여부 로직 -> setRole 후 페이지 이동
    navigate(`/${role}`);
  };

  return (
    <div className="flex h-screen">
      <InitialTopBar />
      <div className="top-container items-center">
        <div className="flex flex-col items-center gap-10">
          <p className="text-black text-2xl font-bold">로그인</p>
          <div className="flex w-[470px] flex-col gap-5 p-5">
            {/* 이메일 */}
            <div className="email">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">이메일</p>
                <input
                  id="email"
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={emailChange}
                  placeholder="이메일을 입력하세요"
                  required
                  className={`py-3 px-4 text-subtitle-regular w-[328px] border rounded-md focus:outline-none 
                ${emailError ? 'border-error' : 'border-gray-2 focus:border-main'}`}
                />
              </div>
              <div className={`flex relative left-[102px] text-error text-xs mt-1 ${emailError ? '' : 'hidden'}`}>{emailError}</div>
            </div>
            {/* 비밀번호 */}
            <div className="password">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">비밀번호</p>
                <input
                  id="password"
                  autoComplete="password"
                  type="password"
                  value={pwd}
                  onChange={pwdChange}
                  placeholder="비밀번호를 입력하세요"
                  required
                  className={`py-3 px-4 text-subtitle-regular w-[328px] border rounded-md focus:outline-none 
                ${pwdError ? 'border-error' : 'border-gray-2 focus:border-main'}`}
                />
              </div>
              <div className={`flex relative left-[102px] text-error text-xs mt-1 ${pwdError ? '' : 'hidden'}`}>{pwdError}</div>
            </div>
            {/* 자동 로그인 */}
            <div className="autoLogin">
              <div className="flex items-center gap-8 justify-end">
                <p className="text-sm font-bold">자동 로그인</p>
                <ToggleBtn state={autoLogin} onClick={() => setAutoLogin((prev) => !prev)} />
              </div>
            </div>
          </div>
          {/* 버튼 */}
          <button onClick={onClickLogin} className="main-btn-lg w-20">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
