import {InquiryData} from '../../../interfaces/interfaces';
import Inquiry from './Inquiry';

// 임시 데이터
const inquiryData: InquiryData = {
  type: '요청',
  title: '계정 변환 변경 요청',
  content:
    '현재 사용자로 로그인되어 있지만, 추가적인 관리 기능을 사용할 수 있는 권한이 부족합니다. 특정 프로젝트에 대한 관리 권한을 부여해 주실 수 있을까요? 현재 사용자로 로그인되어 있지만, 추가적인 관리 기능을 사용할 수 있는 권한이 부족합니다. 특정 프로젝트에 대한 관리 권한을 부여해 주실 수 있을까요? 현재 사용자로 로그인되어 있지만, 추가적인 관리 기능을 사용할 수 있는 권한이 부족합니다. 특정 프로젝트에 대한 관리 권한을 부여해 주실 수 있을까요?',
  date: '2025-02-05',
  status: '답변 대기',
};

export default function InquiryContainer() {
  return (
    <>
      <section className="flex flex-col bg-gray-18 p-6 pb-[38px] mt-3 mb-[100px]">
        <div className="flex text-title-regular mb-5">
          <p className="ml-5 mr-[65px]">유형</p>
          <p className="mr-[504px]">문의 내용</p>
          <p className="mr-[76px]">등록 일자</p>
          <p>문의 상태</p>
        </div>

        <Inquiry data={inquiryData} />
      </section>
    </>
  );
}
