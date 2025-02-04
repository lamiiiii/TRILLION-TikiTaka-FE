import {useState} from 'react';
import {inquiryDummy} from '../../../data/admin';
import InquiryCard from './InquiryCard';
import ReplyModal from './ReplyModal';
import PageNations from '../../manager/common/PageNations';

export default function InquiryList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(inquiryDummy.length / itemsPerPage);

  const indexOfLastInquiry = currentPage * itemsPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - itemsPerPage;
  const currentInquiries = inquiryDummy.slice(indexOfFirstInquiry, indexOfLastInquiry);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const [selectedInquiry, setSelectedInquiry] = useState<{
    id: number;
    user: string;
    type: string;
    title: string;
    content: string;
    date: string;
    status: string;
  } | null>(null);

  return (
    <div className="w-[1100px] mt-[20px] relative mb-[100px]">
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-2 mb-4 px-4">
          <div className="w-[15%]">유형</div>
          <div className="w-[50%]">문의 내용</div>
          <div className="w-[20%]">등록일자</div>
          <div className="w-[20%] ">문의 상태</div>
        </div>
        <div className="flex flex-col gap-4">
          {currentInquiries.map((inquiry) => (
            <InquiryCard key={inquiry.id} {...inquiry} onReplyClick={() => setSelectedInquiry(inquiry)} />
          ))}
        </div>
        {/* 페이지네이션 */}
        <PageNations currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      {/* 답변 등록 모달 */}
      {selectedInquiry && <ReplyModal inquiry={selectedInquiry} onClose={() => setSelectedInquiry(null)} />}
    </div>
  );
}
