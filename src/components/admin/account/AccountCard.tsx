import {useState} from 'react';
import {DotIcon} from '../../common/Icon';
import RoleDropdown from './RoleDropdown';

interface AccountCardProps {
  id: string;
  name: string;
  affiliation: string;
  role: string;
  status: string;
  onRoleChange: (id: string, newRole: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
  onReject: (id: string) => void; 
}

export default function AccountCard({
  id,
  name,
  affiliation,
  role,
  status,
  onRoleChange,
  onStatusChange,
  onDelete,
  onReject, 
}: AccountCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex gap-4 py-3 px-4 border border-gray-2 bg-white items-center rounded cursor-pointer text-subtitle-regular">
      <div className="w-[12%]">{id}</div>
      <div className="w-[16%]">{name}</div>
      <div className="w-[44%]">{affiliation}</div>
      <div className="w-[16%]">
        <RoleDropdown label={role} options={['사용자', '담당자', '관리자']} onSelect={(value) => onRoleChange(id, value)} />
      </div>
      <div className="w-[20%] flex gap-2 relative">
        {status === '대기중' ? (
          <>
            <button
              onClick={() => onStatusChange(id, '승인')}
              className="px-4 py-1 text-subtitle-regular border rounded hover:bg-gray-8 hover:text-white whitespace-nowrap"
            >
              승인
            </button>
            <button
              onClick={() => onReject(id)}
              className="px-4 py-1 text-subtitle-regular border rounded hover:bg-red/80 hover:text-white"
            >
              거절
            </button>
          </>
        ) : (
          <div className={`px-4 py-1 text-subtitle-regular rounded whitespace-nowrap`}>{status}</div>
        )}
        {/* 승인상태 */}
        {status === '승인' && (
          <div className="ml-[120px] mt-1">
            <button onClick={() => setShowMenu(!showMenu)}>
              <DotIcon />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-1 w-[100px] bg-white shadow-md rounded border text-center">
                <button onClick={() => onDelete(id)} className="w-full rounded py-2 text-[12px] font-semibold">
                  <div className='hover:bg-gray-1  text-[12px] rounded-md mx-2 hover:border hover:border-gray-2 text-gray-15'>계정 삭제</div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
