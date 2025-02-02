interface InquiryCardProps {
    type: string;
    title: string;
    content: string;
    date: string;
    status: string;
  }
  
  export default function InquiryCard({ type, title, content, date, status }: InquiryCardProps) {
    return (
      <div className="flex gap-4 py-4 px-4 border border-gray-2 bg-white items-center rounded cursor-pointer hover:bg-gray-1">
        {/* 유형 */}
        <div className="w-[15%] text-gray-700 text-subtitle-regular">{type}</div>
  
        {/* 문의 내용 */}
        <div className="w-[50%] ">
          <div className=" text-gray-900 text-subtitle-regular">{title}</div>
          <div className="w-[422px] text-gray-6 text-caption-regular truncate">{content}</div>
        </div>
  
        {/* 등록일자 */}
        <div className="w-[20%] text-gray-15 text-body-regular">{date}</div>
  
        {/* 문의 상태 */}
        <div className="w-[20%]">
          <button className={`px-4 py-1 rounded text-white text-body-bold ${status === "답변 완료" ? "bg-gray-400" : "bg-main"}`}>
            {status}
          </button>
        </div>
      </div>
    );
  }
  