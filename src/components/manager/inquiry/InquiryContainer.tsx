import {InquiryData} from '../../../interfaces/interfaces';
import Pagenation from '../../common/Pagenation';
import Inquiry from './Inquiry';

interface InquiryContainerProps {
  inquiries: InquiryData[];
}

export default function InquiryContainer({inquiries}: InquiryContainerProps) {
  return (
    <>
      <section className="flex flex-col gap-5 bg-gray-18 p-6 pb-[38px] mt-3 mb-[100px]">
        <div className="flex text-title-regular">
          <p className="ml-5 mr-[65px]">유형</p>
          <p className="mr-[504px]">문의 내용</p>
          <p className="mr-[76px]">등록 일자</p>
          <p>문의 상태</p>
        </div>

        {inquiries.map((inquiry, index) => (
          <Inquiry key={index} data={inquiry} />
        ))}
        <Pagenation />
      </section>
    </>
  );
}
