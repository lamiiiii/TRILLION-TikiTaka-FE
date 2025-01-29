import {useState} from 'react';
import TopMenu from '../../components/common/TopMenu';
import Modal from '../../components/common/Modal';

export default function ManagerInquiry() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <TopMenu boldBlackText="문의 내역 확인" btnText="문의하기" onBtnClick={() => setIsModalOpen(true)} />
      </div>
      {isModalOpen && (
        <Modal
          title="모달 테스트"
          content="테스트입니다"
          backBtn="취소"
          onBackBtnClick={() => {
            console.log('모달 취소');
          }}
          checkBtn="확인"
          onBtnClick={() => {
            console.log('확인');
          }}
        />
      )}
    </div>
  );
}
