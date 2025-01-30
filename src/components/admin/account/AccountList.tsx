import { ACCOUNT_TUPLE, ROLE } from '../../../constants/admin';
import Dropdown from '../../common/Dropdown'; // ✅ 기존 공용 드롭다운 사용

export default function AccountList() {
  return (
    <div className="w-full mt-[20px] px-4 relative mb-[100px]">
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        {/* ✅ 필터 및 사용자 정보 */}
        <div className="flex items-center justify-between px-2">
          {/* 승인 상태 드롭다운 */}
          <Dropdown
            label="승인 상태"
            options={['전체', '승인', '거절', '대기중']}
            onSelect={(value) => console.log(`승인 상태: ${value}`)}
            paddingX="px-3"
          />

          {/* 사용자, 담당자, 관리자 명수 */}
          <div className="flex gap-6 text-gray-15 text-subtitle-regular">
            <span>
              {ROLE[0]} <span className="text-black text-title-bold ml-2">180명</span>
            </span>
            <span>
            {ROLE[1]}  <span className="text-black text-title-bold ml-2">220명</span>
            </span>
            <span>
            {ROLE[2]}  <span className="text-black text-title-bold ml-2">10명</span>
            </span>
          </div>
        </div>
        {/* 테이블 헤더 */}
        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-5 mb-5 px-4">
          <div className="w-[10%]">{ACCOUNT_TUPLE[0]}</div>
          <div className="w-[12%]">{ACCOUNT_TUPLE[1]}</div>
          <div className="w-[22%]">{ACCOUNT_TUPLE[2]}</div>
          <div className="w-[22%]">{ACCOUNT_TUPLE[3]}</div>
          <div className="w-[12%]">{ACCOUNT_TUPLE[4]}</div>
          <div className="w-[24%]">{ACCOUNT_TUPLE[5]}</div>
        </div>
      </div>
    </div>
  );
}
