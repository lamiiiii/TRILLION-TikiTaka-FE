import {useState} from 'react';
import InitialTopBar from './InitialTopBar';
import {SmRightIcon, WhiteCheckIcon} from '../Icon';
import Modal from '../Modal';

export default function SignUpContainer() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [id, setId] = useState('');
  const [idError, setIdError] = useState('');

  const [checked, setChecked] = useState(false);
  const [termsError, setTermsError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 유효성 검사 정규식
    return emailRegex.test(email);
  };

  const validateId = (id: string) => {
    const idRegex = /^[a-z]{3,10}\.[a-z]{1,5}$/; // 아이디 유효성 검사 정규식
    return idRegex.test(id);
  };

  // todo 이메일 중복 여부 체크
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

  // todo 아이디 중복 여부 체크
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

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);

    if (isChecked) {
      setTermsError('');
    }
  };

  const onClickSubmit = () => {
    if (email === '') {
      setEmailError('이메일을 입력해주세요.');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('잘못된 이메일 주소입니다. 이메일 주소를 정확하게 입력해주세요.');
      return;
    }

    if (!checked) {
      setTermsError('이용 정보에 동의해 주세요.');
      return;
    }
    setTermsError('');

    const requestData = {
      email,
      id,
      acceptedTerms: checked,
    };

    // todo 신청 완료 모달 추가 및 페이지 이동
    setIsModalOpen(true);
    console.log(requestData);
  };

  return (
    <div className="flex h-screen">
      <InitialTopBar />
      <div className="top-container items-center">
        <div className="flex flex-col items-center gap-10">
          <p className="text-black text-2xl font-bold">계정 등록 신청</p>
          <div className="flex w-full flex-col gap-5 p-5">
            <div className="email">
              <div className="flex items-center gap-16">
                <p className="text-sm font-bold">이메일</p>
                <input
                  id="email"
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={emailChange}
                  placeholder="user@tikitaka.com"
                  required
                  className={`py-3 px-4 text-subtitle-regular w-[328px] border rounded-md focus:outline-none 
                ${emailError ? 'border-error' : 'border-gray-2 focus:border-main'}`}
                />
              </div>
              <div className={`flex relative left-[101px] text-error text-xs mt-1 ${emailError ? '' : 'hidden'}`}>{emailError}</div>
            </div>
            <div className="id">
              <div className="flex items-center gap-16">
                <p className="text-sm font-bold">아이디</p>
                <input
                  id="id"
                  autoComplete="id"
                  type="id"
                  value={id}
                  onChange={idChange}
                  placeholder="3~15자리/영문 소문자, 점(.) 조합"
                  required
                  className={`py-3 px-4 text-subtitle-regular w-[328px] border rounded-md focus:outline-none 
                ${idError ? 'border-error' : 'border-gray-2 focus:border-main'}`}
                />
              </div>
              <div className={`flex relative left-[101px] text-error text-xs mt-1 ${idError ? '' : 'hidden'}`}>{idError}</div>
            </div>
            <div className="accountTerms">
              <div className="flex w-full py-2 items-center justify-between ">
                <div className="flex items-center gap-[26px]">
                  <p className="text-sm font-bold">이용 정보 동의</p>
                  <label
                    className={`flex items-center justify-center w-4 h-4 border border-gray-2 rounded-md cursor-pointer 
                    ${checked ? 'bg-main border-main' : 'hover:border-main'}`}
                  >
                    <input type="checkbox" checked={checked} onChange={checkboxChange} className="hidden" />
                    {checked && <WhiteCheckIcon />}
                  </label>
                </div>

                {/* todo 이용약관 자세히 보기 (모달/페이지) 추가 */}
                <div
                  className="flex px-2 text-xs text-gray-6 gap-2 focus:outline-none hover:text-main cursor-pointer"
                  onClick={() => console.log('이용 정보 자세히 보기')}
                >
                  이용 정보 자세히 보기
                  <SmRightIcon strokeColor="#727586" />
                </div>
              </div>
              <div className={`flex relative left-[101px] text-error text-xs mt-1 ${termsError ? '' : 'hidden'}`}>{termsError}</div>
            </div>
          </div>
          <button onClick={onClickSubmit} className="main-btn-lg w-20">
            신청 완료
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="계정 등록 신청이 정상적으로 접수되었습니다."
          content={`등록 신청하신 이메일 주소로 결과를 안내드릴 예정입니다.`}
          backBtn="확인"
          onBackBtnClick={() => {
            setIsModalOpen(false);
            window.location.href = '/';
          }}
        />
      )}
    </div>
  );
}
