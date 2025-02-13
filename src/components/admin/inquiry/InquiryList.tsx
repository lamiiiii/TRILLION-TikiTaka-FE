import {useState} from 'react';
import {getInquiries, Inquiry} from '../../../api/service/inquiry';
import PageNations from '../../common/PageNations';
import InquiryCard from './InquiryCard';
import ReplyModal from './ReplyModal';
import {useQuery} from '@tanstack/react-query';
import {ITEMS_PER_PAGE} from '../../../constants/constants';

export default function InquiryList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const {data, refetch} = useQuery({
    queryKey: ['inquiries', currentPage],
    queryFn: () => getInquiries(currentPage - 1, ITEMS_PER_PAGE),
  });

  const inquiries = Array.isArray(data) ? data : [];
  const totalPages = Array.isArray(data) ? Math.ceil(data.length / ITEMS_PER_PAGE) : 1;

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

        <div className="flex flex-col gap-4">
          {Array.isArray(inquiries) &&
            inquiries.map((inquiry) => (
              <InquiryCard key={inquiry.inquiryId} {...inquiry} onReplyClick={() => setSelectedInquiry(inquiry)} />
            ))}
        </div>

        <PageNations currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {selectedInquiry && (
        <ReplyModal inquiryId={selectedInquiry.inquiryId} onClose={() => setSelectedInquiry(null)} onAnswerSubmit={refetch} />
      )}
    </div>
  );
}
