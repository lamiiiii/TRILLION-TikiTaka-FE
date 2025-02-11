import Profile from '../Profile';

interface TicketDetailProps {
  data: TicketDetails;
}
export default function TicketDetail({data}: TicketDetailProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-body-bold">티켓 상세</label>
      <div className="w-full p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-subtitle flex flex-col gap-4">
            <p>담당자</p>
            <p>요청자명</p>
            <p>티켓 유형</p>
            <p>1차 카테고리</p>
            <p>2차 카테고리</p>
            <p>요청일자</p>
            <p>최근 수정일자</p>
            <p>마감일자</p>
          </div>

          <div className="flex flex-col gap-[7px]">
            <div className="flex items-center gap-2">
              {data?.managerName && <Profile name={data?.managerName} backgroundColor="MANAGER" size="md" />}
              <span>{data?.managerName ? data?.managerName : '담당자 미지정'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Profile name={data?.requesterName} backgroundColor="USER" size="md" />
              <span>{data?.requesterName}</span>
            </div>
            <p>{data?.typeName ? data?.typeName : '-'}</p>
            <p>{data?.firstCategoryName ? data?.firstCategoryName : '-'}</p>
            <p>{data?.secondCategoryName ? data?.secondCategoryName : '-'}</p>
            <p>{data?.createdAt ? data?.createdAt : '-'}</p>
            <p>{data?.updatedAt ? data?.updatedAt : '-'}</p>
            <p>{data?.deadline ? data?.deadline : '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
