import {useQuery} from '@tanstack/react-query';
import Inquiry from '../manager/inquiry/Inquiry';
import {getInquiries} from '../../api/service/inquiry';
import PageNations from '../common/PageNations';
import {useMemo, useState} from 'react';
import {ITEMS_PER_PAGE} from '../../constants/constants';
import {ERROR_MESSAGES} from '../../constants/error';

export default function InquiryContainer() {
  const [currentPage, setCurrentPage] = useState(1);

  const {data: inquiries} = useQuery({
    queryKey: ['inquiries'],
    queryFn: () => getInquiries(),
  });

  const paginatedInquiries = useMemo(() => {
    if (!inquiries) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return inquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [inquiries, currentPage]);

  const totalPages = useMemo(() => {
    if (!inquiries) return 1;
    return Math.ceil(inquiries.length / ITEMS_PER_PAGE);
  }, [inquiries]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-5 bg-gray-18 p-6 pb-[38px] mt-3 mb-[100px]">
        <div className="flex text-title-regular">
          <p className="ml-5 mr-[65px]">유형</p>
          <p className="mr-[504px]">문의 내용</p>
          <p className="mr-[76px]">등록 일자</p>
          <p>문의 상태</p>
        </div>

        {paginatedInquiries.length > 0 ? (
          paginatedInquiries.map((inquiry, index) => <Inquiry key={index} data={inquiry} />)
        ) : (
          <div className="text-gray-500 text-center py-4">{ERROR_MESSAGES.NO_INQUIRY}</div>
        )}

        <PageNations currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
    </>
  );
}
