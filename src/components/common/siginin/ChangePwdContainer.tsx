import {useState} from 'react';
import InitialTopBar from './InitialTopBar';
import Modal from '../Modal';
import {useUserStore} from '../../../store/store';
import { useNavigate } from 'react-router-dom';

// 토큰값 없으면 접근 불가
export default function ChangePwdContainer() {
  const {role} = useUserStore();
  const navigate = useNavigate();

  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newPwdError, setNewPwdError] = useState('');
  const [newPwdCheck, setNewPwdCheck] = useState('');
  const [newPwdCheckError, setNewPwdCheckError] = useState('');

  const [modalState, setModalState] = useState<{open: boolean; type: 'error' | 'success' | null}>({
    open: false,
    type: null,
  });

  // 비밀번호 정규식 (영문, 숫자, 특수문자 포함, 6~32자)
  const validatePwd = (password: string) => {
    const pwdRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,32}$/;
    return pwdRegex.test(password);
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

  const onClickChange = () => {
    if (pwd === '') {
      setPwdError('비밀번호를 입력해주세요.');
      return;
    } else if (!validatePwd(pwd)) {
      setPwdError('비밀번호는 영문, 숫자, 특수문자가 조합된 6~32자여야 합니다.');
      return;
    }

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
      setPwdError('비밀번호는 영문, 숫자, 특수문자가 조합된 6~32자여야 합니다.');
      return;
    }

    const requestData = {
      pwd,
      newPwd,
    };

    // todo 비밀번호 변경 완료 모달 추가 및 메인페이지 이동
    // 응답 내용에 따른 처리
    const isCurrentPwdCorrect = true;
    if (!isCurrentPwdCorrect) {
      setModalState({open: true, type: 'error'});
      return;
    }
    setModalState({open: true, type: 'success'});

    console.log(requestData);
  };

  return (
    <div className="flex h-screen">
      <InitialTopBar />
      <div className="top-container items-center">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <p className="text-black text-2xl font-bold">비밀번호 변경</p>
            <p className="text-error text-sm font-bold">임시 비밀번호 유출 방지를 위해 최초 로그인 시 반드시 비밀번호를 변경해 주세요.</p>
          </div>
          <div className="flex w-[500px] flex-col gap-5 p-5">
            {/* 현재 비밀번호 */}
            <div className="currentPwd">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">현재 비밀번호</p>
                <input
                  id="currentPwd"
                  autoComplete="currentPwd"
                  type="password"
                  value={pwd}
                  onChange={pwdChange}
                  placeholder="현재 비밀번호를 입력하세요"
                  required
                  className={`py-3 px-4 text-subtitle-regular w-[328px] border rounded-md focus:outline-none 
                ${pwdError ? 'border-error' : 'border-gray-2 focus:border-main'}`}
                />
              </div>
              <div className={`flex relative left-[132px] text-error text-xs mt-1 ${pwdError ? '' : 'hidden'}`}>{pwdError}</div>
            </div>
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
          </div>
          {/* 버튼 */}
          <button onClick={onClickChange} className="main-btn-lg w-20">
            변경 완료
          </button>
        </div>
      </div>
      {modalState.open && (
        <Modal
          title={modalState.type === 'error' ? '비밀번호 오류' : '변경 완료'}
          content={modalState.type === 'error' ? '현재 비밀번호가 올바르지 않습니다.' : '비밀번호가 성공적으로 변경되었습니다.'}
          backBtn="확인"
          onBackBtnClick={() => {
            setModalState({open: false, type: null});
            if (modalState.type === 'success') {
                navigate(`/${role}`, { replace: true });
            }
          }}
        />
      )}
    </div>
  );
}
