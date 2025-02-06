import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useTokenStore, useUserStore} from '../../../store/store';
import {validateId, validatePwd} from '../../../utils/Validation';
import InitialLayout from './InitialLayout';
import {postLogin} from '../../../api/service/auth';
import Modal from '../Modal';
import { useEnterKeyHandler } from '../../../hooks/useEnterKeyHandler';

// 연속 5회 설정한 비밀번호가 틀렸을 경우 30분간 잠금
// 토큰값 있으면 리다이렉트
export default function SignInContainer() {
  const navigate = useNavigate();
  const {login} = useTokenStore();
  const {setUserId, setRole} = useUserStore();

  const [id, setId] = useState('');
  const [idError, setIdError] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('로그인');
  const [modalMessage, setModalMessage] = useState('');

  const validateInput = (type: 'id' | 'pwd', value: string) => {
    if (!value) return type === 'id' ? '아이디를 입력해주세요.' : '비밀번호를 입력해주세요.';
    if (type === 'id' && !validateId(value)) return '아이디는 영어 소문자와 점(.)을 포함한 3~15자여야 합니다.';
    if (type === 'pwd' && !validatePwd(value)) return '비밀번호는 영문, 숫자, 특수문자가 조합된 6~32자여야 합니다.';
    return '';
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, setError: React.Dispatch<React.SetStateAction<string>>, type: 'id' | 'pwd') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setter(value);
      setError(validateInput(type, value));
    };

  const onClickLogin = async () => {
    const idValidation = validateInput('id', id);
    const pwdValidation = validateInput('pwd', pwd);

    setIdError(idValidation);
    setPwdError(pwdValidation);

    if (idValidation || pwdValidation) return;

    try {
      const response = await postLogin({username: id, password: pwd});
      if (!response) {
        setModalMessage('');
        setModalTitle('');
      }

      if (response) {
        const {accessToken, data} = response;
        if (accessToken) {
          login(accessToken);
          if (data.passwordChangeNeeded) {
            navigate('/changepwd', {replace: true});
          } else {
            if (data.role && data.id) {
              setRole(data.role);
              setUserId(data.id);
              navigate(`/${data.role.toLowerCase()}`, {replace: true});
            }
          }
        }
      }
    } catch (error: any) {
      console.error('로그인 실패:', error);
      setIsModalOpen(true);
      setModalTitle('로그인 안내');
      setModalMessage(error.response?.data?.message || '알 수 없는 오류가 발생했습니다.');
    }
  };
  useEnterKeyHandler(onClickLogin);

  const closeModal = () => {
    setId('');
    setIdError('');
    setPwd('');
    setPwdError('');
    setIsModalOpen(false);
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
                onChange={handleChange(setId, setIdError, 'id')}
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
                onChange={handleChange(setPwd, setPwdError, 'pwd')}
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
            <Link to="/signup" className="cursor-pointer hover:underline hover:text-gray-15">
              계정 등록 신청
            </Link>
            <Link to="/resetpwd" className="cursor-pointer hover:underline hover:text-gray-15">
              비밀번호 재설정
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal title={modalTitle} content={modalMessage} backBtn="확인" onBackBtnClick={closeModal} />}
    </InitialLayout>
    // </div>
  );
}
