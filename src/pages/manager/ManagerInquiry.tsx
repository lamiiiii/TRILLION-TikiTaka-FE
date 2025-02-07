// import {useState} from 'react';
// import TopMenu from '../../components/common/TopMenu';
// import InquiryContainer from '../../components/manager/inquiry/InquiryContainer';
// import InquiryModal from '../../components/manager/inquiry/InquiryModal';
// import {INQUIRY_DATA} from '../../constants/constants';

// export default function ManagerInquiry() {
//   const [showModal, setShowModal] = useState(false);

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };
//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="top-container">
//       <div className="flex flex-col max-w-1200">
//         <TopMenu boldBlackText="문의 내역 확인" btnText="문의하기" onBtnClick={handleOpenModal} />
//         <InquiryContainer inquiries={INQUIRY_DATA} />
//         {showModal && <InquiryModal onClose={handleCloseModal} />}
//       </div>
//     </div>
//   );
// }
