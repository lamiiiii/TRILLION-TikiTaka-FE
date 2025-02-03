import {useState} from 'react';
import Dropdown from '../../common/Dropdown';
import {DotIcon} from '../../common/Icon';

interface AccountCardProps {
  id: string;
  name: string;
  department: string;
  affiliation: string;
  role: string;
  status: string;
  onDepartmentChange: (id: string, newDepartment: string) => void;
  onAffiliationChange: (id: string, newAffiliation: string) => void;
  onRoleChange: (id: string, newRole: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}

export default function AccountCard({
  id,
  name,
  department,
  affiliation,
  role,
  status,
  onDepartmentChange,
  onAffiliationChange,
  onRoleChange,
  onStatusChange,
  onDelete,
}: AccountCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex gap-4 py-3 px-4 border border-gray-2 bg-white items-center rounded cursor-pointer">
      <div className="w-[10%]">{id}</div>
      <div className="w-[12%]">{name}</div>

      {/* 부서 드롭다운 */}
      <div className="w-[22%]">
        <Dropdown
          label={department}
          options={['인프라 엔지니어링', '소프트웨어 개발', '보안']}
          onSelect={(value) => onDepartmentChange(id, value)}
        />
      </div>
      <div className="w-[22%]">
        <Dropdown label={affiliation} options={['인프라 팀', '보안팀', '개발팀']} onSelect={(value) => onAffiliationChange(id, value)} />
      </div>
      <div className="w-[12%]">
        <Dropdown label={role} options={['사용자', '담당자', '관리자']} onSelect={(value) => onRoleChange(id, value)} />
      </div>

      {/* 승인/거절 상태 */}
      <div className="w-[24%] flex gap-2 relative">
        {status === '대기중' ? (
          <>
            <button
              onClick={() => onStatusChange(id, '승인됨')}
              className="px-4 py-1 text-subtitle-regular border rounded hover:bg-gray-8 hover:text-white"
            >
              승인
            </button>
            <button
              onClick={() => onStatusChange(id, '거절됨')}
              className="px-4 py-1 text-subtitle-regular border rounded hover:bg-red/80 hover:text-white"
            >
              거절
            </button>
          </>
        ) : (
          <span className={`px-4 py-1 text-subtitle-regular rounded ${status === '승인됨' ? 'text-blue-600 ' : 'text-red-600'}`}>
            {status}
          </span>
        )}

        {/* 승인된 경우 메뉴 버튼 (삭제 가능) */}
        {status === '승인됨' && (
          <div className="ml-[120px] mt-1">
            <button onClick={() => setShowMenu(!showMenu)}>
              <DotIcon />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-[100px] bg-white shadow-md rounded border text-center">
                <button onClick={() => onDelete(id)} className="w-full rounded px-3 py-2 text-[12px] font-semibold hover:bg-gray-1">
                  계정 삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
