import {useState} from 'react';
import TopMenu from '../../components/common/TopMenu';
import InquiryModal from '../../components/manager/inquiry/InquiryModal';
import UserInquiryContainer from '../../components/user/UserInquiryContainer';

export default function UserInquiry() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <TopMenu boldBlackText="문의 내역 확인" btnText="문의하기" onBtnClick={handleOpenModal} />
        <UserInquiryContainer />
        {showModal && <InquiryModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
}
