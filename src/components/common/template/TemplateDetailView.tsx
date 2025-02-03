import {useEffect, useState} from 'react';
import {Template} from '../../../interfaces/newTicket';
import {templateDummy} from '../../../data/newTicketData';

interface TemplateDetailViewProps {
  templateId: number;
}

export default function TemplateDetailView({templateId}: TemplateDetailViewProps) {
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    // 실제 API 호출 대신 더미 데이터를 사용
    console.log(templateId);
    setTemplate(templateDummy);
  }, []);

  const renderTemplateDetail = (label: string, value: string | undefined) => (
    <div className="flex items-center">
      <div className="text-body-bold w-24">{label}</div>
      <div className="max-h-80">{value}</div>
    </div>
  );

  if (!template) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col p-4 gap-6">
      <div className="flex text-title-bold text-black justify-between">
        <p className="text-title-bold">{template.name}</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => console.log('템플릿 수정')} className="main-button">
            템플릿 수정
          </button>
          <button onClick={() => console.log('템플릿 삭제')} className="main-button">
            템플릿 삭제
          </button>
        </div>
      </div>
      {/* 내용 */}
      <div className="flex flex-col w-full min-h-[600px] bg-gray-18 p-7 gap-4 text-body-regular">
        {renderTemplateDetail('템플릿 제목', template.name)}
        <div className="w-10" />
        {renderTemplateDetail('1차 카테고리', template.firstCategory)}
        {renderTemplateDetail('2차 카테고리', template.secondCategory)}
        {renderTemplateDetail('담당자', template.manager)}
        {renderTemplateDetail('유형', template.type)}
        <div className="w-10" />
        {renderTemplateDetail('요청 제목', template.title)}
        {renderTemplateDetail('요청 내용', template.content)}
        {renderTemplateDetail('첨부파일', '첨부파일')}
      </div>
      <div className="flex w-full justify-center">
        <button onClick={() => console.log('템플릿 적용')} className="btn mb-4">
          적용
        </button>
      </div>
    </div>
  );
}
