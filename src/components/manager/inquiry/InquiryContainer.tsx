import { Inquiry as InquiryType } from "../../../api/service/inquiry"; // 🔥 타입에 별칭 적용
import Pagenation from "../../common/Pagenation";
import InquiryCard from "./Inquiry"; // 🔥 Inquiry.tsx에서 가져오는 컴포넌트 이름 변경

interface InquiryContainerProps {
  inquiries: InquiryType[];
}

export default function InquiryContainer({ inquiries }: InquiryContainerProps) {
  return (
    <>
      <section className="flex flex-col gap-5 bg-gray-18 p-6 pb-[38px] mt-3 mb-[100px]">
        <div className="flex text-title-regular">
          <p className="ml-5 mr-[65px]">유형</p>
          <p className="mr-[504px]">문의 내용</p>
          <p className="mr-[76px]">등록 일자</p>
          <p>문의 상태</p>
        </div>

        {inquiries.map((inquiry) => (
          <InquiryCard key={inquiry.inquiryId} data={inquiry} />
        ))}

        <Pagenation />
      </section>
    </>
  );
}
