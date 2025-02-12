import { useEffect, useState } from "react";
import { getInquiries, Inquiry } from "../../../api/service/inquiry";
import PageNations from "../../common/PageNations";
import InquiryCard from "./InquiryCard";
import ReplyModal from "./ReplyModal";

export default function InquiryList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // 문의사항 조회 API 호출
  const fetchInquiries = async () => {
    try {
      const response = await getInquiries(currentPage - 1, itemsPerPage);

      if (Array.isArray(response)) {
        setInquiries(response);
        setTotalPages(1);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError("문의사항을 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-[1100px] mt-[20px] relative mb-[100px]">
      <div className="bg-gray-18 h-full flex flex-col justify-start p-4">
        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-2 mb-4 px-4">
          <div className="w-[15%]">유형</div>
          <div className="w-[50%]">문의 내용</div>
          <div className="w-[20%]">등록일자</div>
          <div className="w-[20%] ">문의 상태</div>
        </div>

        {/* 오류 메시지 출력 */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* 문의사항 목록 */}
        <div className="flex flex-col gap-4">
          {Array.isArray(inquiries) && inquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry.inquiryId}
              {...inquiry}
              onReplyClick={() => setSelectedInquiry(inquiry)}
            />
          ))}
        </div>

        {/* 페이지네이션 */}
        <PageNations currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* 답변 등록 모달 */}
      {selectedInquiry && (
        <ReplyModal 
          inquiryId={selectedInquiry.inquiryId} 
          onClose={() => setSelectedInquiry(null)} 
          onAnswerSubmit={fetchInquiries} // 🚀 답변 후 리스트 새로고침
        />
      )}
    </div>
  );
}
