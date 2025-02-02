import { inquiryDummy } from "../../../data/admin";
import InquiryCard from "./InquiryCard";

export default function InquiryList() {
  return (
    <div className="w-[1100px] mt-[20px] relative mb-[100px]">
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        {/* 테이블 헤더 */}
        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-5 mb-5 px-4">
          <div className="w-[15%]">유형</div>
          <div className="w-[50%]">문의 내용</div>
          <div className="w-[20%]">등록일자</div>
          <div className="w-[20%] ">문의 상태</div>
        </div>

        {/* 문의 리스트 */}
        <div className="flex flex-col gap-4">
          {inquiryDummy.map((inquiry) => (
            <InquiryCard key={inquiry.id} {...inquiry} />
          ))}
        </div>
      </div>
    </div>
  );
}
