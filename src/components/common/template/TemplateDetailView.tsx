import {useEffect, useState} from 'react';
import {deleteTicketTemplate, getTicketTemplate, updateTicketTemplate} from '../../../api/service/ticketTemplates';
import {useNewTicketStore} from '../../../store/store';
import Modal from '../Modal';

interface TemplateDetailViewProps {
  templateId: number;
  onDelete: (templateId: number) => void;  // onDelete 속성 추가
}

export default function TemplateDetailView({ templateId, onDelete }: TemplateDetailViewProps) {
  const [template, setTemplate] = useState<TemplateListItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {setTitle, setContent, setIsUrgent, setTicketType, setDueDate, setDueTime, setFirstCategoryId, setSecondCategoryId, setManagerId} =
    useNewTicketStore();

  useEffect(() => {
    const fetchTemplate = async () => {
      const fetchedTemplate = await getTicketTemplate(templateId);
      setTemplate(fetchedTemplate);
    };
    fetchTemplate();
  }, [templateId]);

  const onApplyClick = () => {
    setIsModalOpen(true);
  };

  const confirmApply = () => {
    if (!template) return;

    setTitle(template.title);
    setContent(template.description);
    setIsUrgent(false); // 기본값으로 설정 (템플릿에서 받아오는 값이 없다고 가정)
    setTicketType({typeId: template.typeId, typeName: template.typeName ?? ''});
    setDueDate(''); // 필요하면 템플릿에서 가져올 값 설정
    setDueTime('');
    setFirstCategoryId(Number(template.firstCategoryId));
    setSecondCategoryId(Number(template.secondCategoryId));
    setManagerId(Number(template.managerId));
    setIsModalOpen(false);
  };
  const onCancel = () => {
    setIsModalOpen(false);
  };

  const onEditClick = async () => {
    if (!template) return;

    const updatedTemplate = {
      templateTitle: template.templateTitle,
      title: template.title,
      description: template.description,
      typeId: template.typeId,
      firstCategoryId: template.firstCategoryId,
      secondCategoryId: template.secondCategoryId,
      managerId: template.managerId,
    };

    try {
      await updateTicketTemplate(templateId, updatedTemplate);
      alert('템플릿 수정이 완료되었습니다.');
    } catch (error) {
      alert('템플릿 수정에 실패했습니다.');
    }
  };

  const onDeleteClick = async () => {
    if (!template) return;

    const confirmDelete = window.confirm('정말로 이 템플릿을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deleteTicketTemplate(templateId);
        alert('템플릿 삭제가 완료되었습니다.');
        onDelete(templateId);
      } catch (error) {
        alert('템플릿 삭제에 실패했습니다.');
      }
    }
  };

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
        <p className="text-title-bold">{template.templateTitle}</p>
        <div className="flex gap-4 justify-center">
          <button onClick={onEditClick} className="main-button">
            템플릿 수정
          </button>
          <button onClick={onDeleteClick} className="main-button">
            템플릿 삭제
          </button>
        </div>
      </div>
      {/* 내용 */}
      <div className="flex flex-col w-full min-h-[500px] bg-gray-18 p-7 gap-6 text-body-regular">
        {renderTemplateDetail('템플릿 제목', template.templateTitle)}
        <div className="w-10" />
        {renderTemplateDetail('1차 카테고리', template.firstCategoryName)}
        {renderTemplateDetail('2차 카테고리', template.secondCategoryName)}
        {renderTemplateDetail('담당자', template.managerName)}
        {renderTemplateDetail('유형', template.typeName)}
        <div className="w-10" />
        {renderTemplateDetail('요청 제목', template.title)}
        {renderTemplateDetail('요청 내용', template.description)}
      </div>
      <div className="flex w-full justify-center">
        <button onClick={onApplyClick} className="btn mb-4">
          적용
        </button>
      </div>

      {isModalOpen && (
        <Modal
          title="템플릿 적용"
          content="현재 작성 중인 내용이 템플릿 내용으로 덮어씌워집니다. 계속하시겠습니까?"
          backBtn="취소"
          onBackBtnClick={onCancel}
          checkBtn="확인"
          onBtnClick={confirmApply}
        />
      )}
    </div>
  );
}
