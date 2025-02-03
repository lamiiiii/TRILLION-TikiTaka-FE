import {ListIcon} from '../Icon';
import {templatesDummy} from '../../../data/newTicketData';
import TemplateListItem from './TemplateListItem';
import Pagenation from '../Pagenation';

interface TemplateListViewProps {
  onSelect: (templateId: number) => void;
}

export default function TemplateListView({onSelect}: TemplateListViewProps) {
  return (
    <div className="flex flex-col p-4 gap-6">
      <div className="flex gap-2 text-title-bold text-black">
        <ListIcon />
        템플릿 목록
      </div>
      {/* 목록 */}
      <div className="flex flex-col w-full min-h-[650px] bg-gray-18 p-6 gap-4">
        {/* 테이블 헤더 */}
        <div className="flex p-3 text-title-regular text-black justify-between whitespace-nowrap">
          <div className="w-32">카테고리</div>
          <div className="w-72">템플릿</div>
          <div className="w-32">생성일자</div>
        </div>
        <ul className="w-full">
          {templatesDummy.map((template) => (
            <TemplateListItem key={template.id} template={template} onClick={() => onSelect(template.id)} />
          ))}
        </ul>
        {/* 페이지네이션 */}
        <Pagenation />
      </div>
    </div>
  );
}
