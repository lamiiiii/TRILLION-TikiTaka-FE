import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getRegistrationList} from '../../../api/service/registration';
import {ACCOUNT_MENU} from '../../../constants/admin';
import AccountCard from './AccountCard';
import Dropdown from '../../common/Dropdown';
import PageNations from '../../manager/common/PageNations';

interface RegistrationAccount {
  registrationId: number;
  username: string;
  email: string;
  status: 'PENDING' | 'REJECTED';
  createdAt: string;
}

export default function AccountList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedStatus, setSelectedStatus] = useState<'PENDING' | 'REJECTED'>('PENDING');

  // 승인 대기 목록 API 요청
  const {data} = useQuery({
    queryKey: ['registrationAccounts', selectedStatus, currentPage],
    queryFn: () => getRegistrationList({page: currentPage - 1, size: itemsPerPage, status: selectedStatus}),
  });

  const accounts: RegistrationAccount[] = data?.data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  // 최신순 정렬
  const sortedAccounts = accounts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // 필터 변경 핸들러
  const handleStatusSelect = (value: string) => {
    setSelectedStatus(value === '승인 대기' ? 'PENDING' : 'REJECTED');
  };

  return (
    <div className="w-full mt-[20px] relative mb-[100px]">
      <div className="bg-gray-18 h-full flex flex-col justify-start p-4">
        {/* 필터 */}
        <div className="flex items-center justify-between px-2">
          <Dropdown
            label={selectedStatus === 'PENDING' ? '승인 대기' : '거절됨'}
            options={['승인 대기', '거절됨']}
            onSelect={handleStatusSelect}
            paddingX="px-4"
          />
          <div className="ml-auto text-gray-700 text-subtitle">
            조회 건수 <span className="text-black text-title-bold ml-1">{data?.data?.totalElements ?? 0}건</span>
          </div>
        </div>

        {/* 테이블 헤더 */}
        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-5 mb-5 px-4">
          <div className="w-[12%]">{ACCOUNT_MENU[0]}</div>
          <div className="w-[16%]">{ACCOUNT_MENU[1]}</div>
          <div className="w-[44%]">{ACCOUNT_MENU[2]}</div>
          <div className="w-[16%]">{ACCOUNT_MENU[3]}</div>
          <div className="w-[20%]">{ACCOUNT_MENU[4]}</div>
        </div>

        {/* 승인 대기 목록 데이터 */}
        <div className="flex flex-col gap-4">
          {sortedAccounts.map((account) => (
            <AccountCard key={account.registrationId} {...account} role="USER" />
          ))}
        </div>

        {/* 페이지네이션 */}
        <PageNations currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
