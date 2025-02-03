import {useState} from 'react';
import InitialTopBar from './InitialTopBar';
import Modal from '../Modal';

export default function ResetPwdContainer() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isAuthSent, setIsAuthSent] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authCodeError, setAuthCodeError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const [newPwd, setNewPwd] = useState('');
  const [newPwdError, setNewPwdError] = useState('');
  const [newPwdCheck, setNewPwdCheck] = useState('');
  const [newPwdCheckError, setNewPwdCheckError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setEmailError('이메일 주소를 입력해주세요.');
    } else if (!validateEmail(value)) {
      setEmailError('잘못된 이메일 주소입니다. 이메일 주소를 정확하게 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const authCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
  };

  const newPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPwd(value);

    if (value === '') {
      setNewPwdError('비밀번호를 입력해주세요.');
    } else if (!validatePwd(value)) {
      setNewPwdError('비밀번호는 영문, 숫자, 특수문자가 조합된 6~32자여야 합니다.');
    } else {
      setNewPwdError('');
    }
  };

  const newPwdCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPwdCheck(value);

    if (value === '') {
      setNewPwdCheckError('비밀번호를 입력해주세요.');
    } else if (!validatePwd(value)) {
      setNewPwdCheckError('비밀번호는 영문, 숫자, 특수문자가 조합된 6~32자여야 합니다.');
    } else if (value !== newPwd) {
      setNewPwdCheckError('비밀번호가 일치하지 않습니다.');
    } else {
      setNewPwdCheckError('');
    }
  };

  const sendAuthCode = () => {
    if (email === '') {
      setEmailError('이메일 주소를 입력해주세요.');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('잘못된 이메일 주소입니다. 이메일 주소를 정확하게 입력해주세요.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('잘못된 이메일 주소입니다.');
      return;
    }
    setIsAuthSent(true);
    // 인증번호 전송 API
    console.log('카카오워크로 인증번호 전송:', email);
  };

  const verifyAuthCode = () => {
    // 인증번호 일치 확인 API
    const responseCode = 200;
    if (responseCode == 200) {
      setIsVerified(true);
      setAuthCodeError('');
    } else {
      setAuthCodeError('인증번호가 일치하지 않습니다.');
    }
  };

  const onClickResetPwd = () => {
    if (newPwd === '') {
      setNewPwdError('새 비밀번호를 입력해주세요.');
      return;
    } else if (!validatePwd(newPwd)) {
      setNewPwdError('새 비밀번호는 영문, 숫자, 특수문자가 조합된 6~32자여야 합니다.');
      return;
    }

    if (newPwdCheck === '') {
      setNewPwdCheckError('새 비밀번호를 다시 입력해주세요.');
      return;
    } else if (newPwd !== newPwdCheck) {
      setNewPwdCheckError('비밀번호가 일치하지 않습니다.');
      return;
    } else if (!validatePwd(newPwdCheck)) {
      setNewPwdCheckError('비밀번호는 영문, 숫자, 특수문자가 조합된 6~32자여야 합니다.');
      return;
    }

    const requestData = {
      email,
      newPwd,
    };

    // todo 비밀번호 재설정 완료 모달 추가 및 페이지 이동
    console.log(requestData);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen">
      <InitialTopBar />
      <div className="top-container items-center">
        <div className="flex flex-col items-center gap-10">
          <p className="text-black text-2xl font-bold">비밀번호 재설정</p>
          <div className="flex w-[500px] flex-col gap-5 p-5">
            {/* 이메일 */}
            {!isVerified && (
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
                <div className={`flex relative left-[132px] text-error text-xs mt-1 ${emailError ? '' : 'hidden'}`}>{emailError}</div>
              </div>
            )}
            {/* 인증번호 입력 (이메일 전송 후 표시) */}
            {!isVerified && isAuthSent && (
              <div className="authCode">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">인증번호</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={authCode}
                      onChange={authCodeChange}
                      placeholder="인증번호 입력"
                      className={`py-3 px-4 text-subtitle-regular w-[328px] border rounded-md focus:outline-none ${
                        authCodeError ? 'border-error' : 'border-gray-2 focus:border-main'
                      }`}
                    />
                  </div>
                  {authCodeError && <p className="text-error text-xs mt-1">{authCodeError}</p>}
                </div>
              </div>
            )}

            {isVerified && (
              <>
                {/* 새 비밀번호 */}
                <div className="newPwd">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">새 비밀번호</p>
                    <input
                      id="newPwd"
                      autoComplete="newPwd"
                      type="password"
                      value={newPwd}
                      onChange={newPwdChange}
                      placeholder="새 비밀번호를 입력하세요"
                      required
                      className={`py-3 px-4 text-subtitle-regular w-[328px] border rounded-md focus:outline-none 
                ${newPwdError ? 'border-error' : 'border-gray-2 focus:border-main'}`}
                    />
                  </div>
                  <div className={`flex relative left-[132px] text-error text-xs mt-1 ${newPwdError ? '' : 'hidden'}`}>{newPwdError}</div>
                </div>
                {/* 새 비밀번호 확인*/}
                <div className="newPwdCheck">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">새 비밀번호 확인</p>
                    <input
                      id="newPwdCheck"
                      autoComplete="newPwdCheck"
                      type="password"
                      value={newPwdCheck}
                      onChange={newPwdCheckChange}
                      placeholder="새 비밀번호를 다시 입력하세요"
                      required
                      className={`py-3 px-4 text-subtitle-regular w-[328px] border rounded-md focus:outline-none 
                ${newPwdCheckError ? 'border-error' : 'border-gray-2 focus:border-main'}`}
                    />
                  </div>
                  <div className={`flex relative left-[132px] text-error text-xs mt-1 ${newPwdCheckError ? '' : 'hidden'}`}>
                    {newPwdCheckError}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* 버튼 */}
          <button
            onClick={!isVerified ? (isAuthSent ? verifyAuthCode : sendAuthCode) : onClickResetPwd}
            disabled={
              !isVerified
                ? isAuthSent
                  ? authCode.trim() === ''
                  : email.trim() === '' || emailError !== ''
                : newPwd.trim() === '' || newPwdCheck.trim() === '' || newPwdError !== '' || newPwdCheckError !== ''
            }
            className="main-btn-lg disabled:bg-gray-2 disabled:cursor-not-allowed w-32"
          >
            {!isVerified ? (isAuthSent ? '인증번호 확인' : '인증하기') : '재설정 완료'}
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="비밀번호 재설정 완료"
          content="비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요."
          backBtn="로그인하러 가기"
          onBackBtnClick={() => {
            setIsModalOpen(false);
            window.location.href = '/signin';
          }}
        />
      )}
    </div>
  );
}
