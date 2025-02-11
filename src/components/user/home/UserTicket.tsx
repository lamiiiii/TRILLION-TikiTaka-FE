
import {Link} from 'react-router-dom';
// import {useUserStore} from '../../../store/store';
import {AlertIcon} from '../../common/Icon';


interface UserTicketProps extends TicketListItem {
  detailLink: string; 
  onAssigneeChange?: (newAssignee: string) => void; 
  onApprove?: (ticketId: number) => void;
  onReject?: (ticketId: number) => void;
  onStatusChange: (ticketId: number, newStatus: string) => void;
}

export default function UserTicket({
  ticketId,
  title,
  typeName,
  description,
  firstCategoryName,
  secondCategoryName,
  managerName,
  urgent,
  deadline,
  detailLink,
}: UserTicketProps) {

  const typeNameMapping: Record<string, string> = {
    CREATE: '생성',
    DELETE: '삭제',
    UPDATE: '수정',
    ETC: '기타',
  };

  const ticketClass = urgent ? 'border-error bg-white hover:bg-red/5' : 'border-gray-2 bg-white hover:bg-gray-1';

  return (
    <div className={`flex gap-4 py-3 px-2 border items-center rounded cursor-pointer transition-all duration-200 ${ticketClass}`}>
      <Link to={detailLink} className="w-[6%] text-subtitle-regular text-gray-700 px-2">
        #{ticketId}
      </Link>
      <Link to={detailLink} className="w-[18%] text-subtitle-regular">
        <span>{firstCategoryName || '1차 카테고리 미지정'}</span>
        <br />
        <span className="text-gray-6 text-body-regular">{secondCategoryName || '2차 카테고리 미지정'}</span>
      </Link>
      <Link to={detailLink} className="w-[40%]" style={{textAlign: 'left'}}>
        <div className="flex items-center gap-1">
          {urgent && <AlertIcon className="text-error w-4 h-4" />}
          <div className={`flex text-subtitle-regular ${urgent ? 'text-error' : 'text-gray-15'}`}>
            [{typeNameMapping[typeName] || '미정'}]<div className="ml-1">{title}</div>
          </div>
        </div>
        <div className="text-gray-6 text-body-regular">{description.length > 40 ? `${description.slice(0, 40)}...` : description}</div>
      </Link>
      <Link to={detailLink} className="w-[18%] text-body-regular text-gray-15">
        {deadline}
      </Link>
      <div className="w-[18%] text-body-regular">
        {managerName}
      </div>
      
   
    </div>
  );
}
