import {useState} from 'react';
import {ACCOUNT_MENU} from '../../../constants/admin';
import {ROLE} from '../../../constants/constants';
import AccountCard from './AccountCard';
import {accountDummy} from '../../../data/admin';
import Modal from '../../common/Modal';
import Dropdown from '../../common/Dropdown';
import PageNations from '../../manager/common/PageNations';

export default function AccountList({selectedTab}: {selectedTab: '승인 대기' | '계정 목록'}) {
  const [accounts, setAccounts] = useState(accountDummy);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 역할 변경
  const handleRoleChange = (id: string, newRole: string) => {
    setAccounts((prev) => prev.map((acc) => (acc.id === id ? {...acc, role: newRole} : acc)));
  };

  // 승인 버튼 → 승인 대기 목록에서 제거, 계정 목록에 추가
  const handleStatusChange = (id: string, newStatus: string) => {
    if (newStatus === '승인') {
      setAccounts((prev) => prev.map((acc) => (acc.id === id ? {...acc, status: '승인'} : acc)));
    }
  };

  // 거절
  const handleReject = (id: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  // 삭제 모달
  const openDeleteModal = (id: string) => {
    setDeleteTarget(id);
  };

  // 계정 삭제
  const handleDelete = () => {
    if (deleteTarget) {
      setAccounts((prev) => prev.filter((acc) => acc.id !== deleteTarget));
      setDeleteTarget(null);
    }
  };

  // 계정 필터링
  const filteredAccounts =
    selectedTab === '승인 대기' ? accounts.filter((acc) => acc.status === '대기중') : accounts.filter((acc) => acc.status === '승인');

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full mt-[20px] relative mb-[100px]">
      <div className="bg-gray-18 h-full  flex flex-col justify-start p-4">
        <div className="flex items-center justify-between px-2">
          <Dropdown label="승인 상태" options={['전체', '승인', '대기중']} onSelect={() => {}} paddingX="px-3" />
          <div className="flex gap-6 text-gray-15 text-subtitle-regular">
            <span>
              {ROLE[0]} <span className="text-black text-title-bold ml-2">60명</span>
            </span>
            <span>
              {ROLE[1]} <span className="text-black text-title-bold ml-2">6명</span>
            </span>
            <span>
              {ROLE[2]} <span className="text-black text-title-bold ml-2">1명</span>
            </span>
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
        <div className="flex flex-col gap-4">
          {currentAccounts.map((account) => (
            <AccountCard
              key={account.id}
              {...account}
              onRoleChange={handleRoleChange}
              onStatusChange={handleStatusChange}
              onDelete={openDeleteModal}
              onReject={handleReject}
            />
          ))}
        </div>
        <PageNations currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      {/* 계정 삭제 모달 */}
      {deleteTarget && (
        <Modal
          title="해당 사용자의 계정을 삭제하시겠습니까?"
          content={`"${deleteTarget}"님의 계정이 삭제됩니다.\n해당 계정은 복구가 불가능합니다.`}
          backBtn="취소"
          onBackBtnClick={() => setDeleteTarget(null)}
          checkBtn="삭제"
          onBtnClick={handleDelete}
        />
      )}
    </div>
  );
}
