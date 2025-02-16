import TopMenu from '../../common/TopMenu';
import TicketPreview from '../../common/ticket/TicketPreview';
import TicketOptions from '../../common/ticket/TicketOptions';
import {useNewTicketFormStore, useNewTicketStore, useUserStore} from '../../../store/store';
import NewTicketContent from '../../common/ticket/NewTicketContent';
import {useEffect, useRef, useState} from 'react';
import TemplateContainer from '../../common/template/TemplateContainer';
import {ReferredIcon, RequiredIcon} from '../Icon';
import Modal from '../Modal';
import {createTicket} from '../../../api/service/tickets';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {MAX_FILE_SIZE, MAX_FILES} from '../../../constants/constants';

export default function NewTicketContainer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [hasChanges, setHasChanges] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [ticketId, setTicketId] = useState(0);

  const {role} = useUserStore();
  const {
    title,
    content,
    isUrgent,
    firstCategory,
    secondCategory,
    ticketType,
    dueDate,
    dueTime,
    manager,
    setTitle,
    setContent,
    setIsUrgent,
    setFirstCategory,
    setSecondCategory,
    setTicketType,
    setDueDate,
    setDueTime,
    setManager,
  } = useNewTicketStore();
  const {mustDescription, setDescription, setMustDescription} = useNewTicketFormStore();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasChanges) {
        event.returnValue = '변경 사항이 저장되지 않았습니다. 계속 진행하시겠습니까?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasChanges]);

  useEffect(() => {
    if (title || content || isUrgent || firstCategory || secondCategory || ticketType || dueDate || dueTime || manager) {
      setHasChanges(true);
    }
  }, [title, content, isUrgent, firstCategory, secondCategory, ticketType, dueDate, dueTime, manager]);

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert('마감기한은 오늘 이후 날짜를 선택해주세요.');
      setDueDate('');
    } else {
      setDueDate(e.target.value);
    }
  };

  const onClickBtn = () => {
    const missingFields = [];
    if (!ticketType.typeId) missingFields.push('유형');
    if (!title) missingFields.push('요청 제목');
    if (!content) missingFields.push('요청 내용');
    if (!dueDate) missingFields.push('마감기한');

    if (missingFields.length > 0) {
      setModalMessage(`다음 필수 항목을 입력해주세요:\n${missingFields.join(', ')}`);
      setIsModalOpen(true);
      return;
    }

    setModalMessage('⚠️ 티켓을 생성하면 알림이 발송됩니다. 진행하시겠습니까?');
    setIsModalOpen(true);
  };

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => createTicket(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['tickets']});
      const ticketId = data.data.ticketId;
      setTicketId(ticketId);
      setModalMessage(`티켓이 생성되었습니다! #${ticketId}. 이동하시겠습니까?`);
      setIsModalOpen(true);
      setFiles([]);
      setFileNames([]);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data.message || '알 수 없는 에러가 발생했습니다.';
      setModalMessage(`${errorMessage}`);
      setIsModalOpen(true);
    },
  });

  const confirmSubmit = async () => {
    setIsModalOpen(!isModalOpen);
    setTitle('');
    setContent('');
    setIsUrgent(false);
    setFirstCategory(null);
    setSecondCategory(null);
    setTicketType({typeId: 0, typeName: ''});
    setDueDate('');
    setDueTime('');
    setManager(null);
    setDescription('');
    setMustDescription('');

    if (ticketId) {
      navigate(`/${role.toLocaleLowerCase()}/detail/${ticketId}`, {replace: true});
    }

    const formattedDueDate = `${dueDate} ${dueTime}`;

    const requestData = {
      title: title.slice(0, 150),
      description: content.slice(0, 5000),
      urgent: isUrgent,
      typeId: ticketType.typeId,
      deadline: formattedDueDate,
      managerId: manager?.userId,
      firstCategoryId: firstCategory?.id,
      secondCategoryId: secondCategory?.id,
    };

    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(requestData)], {type: 'application/json'}));

    files.forEach((file) => formData.append('files', file));

    mutation.mutate(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    const totalFiles = files.length + selectedFiles.length;
    if (totalFiles > MAX_FILES) {
      alert(`최대 ${MAX_FILES}개의 파일만 선택할 수 있습니다.`);
      return;
    }

    const validFiles = selectedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} 파일 크기가 10MB를 초과했습니다.`);
        return false;
      }
      return true;
    });

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    setFileNames((prevFileNames) => [
      ...prevFileNames,
      ...validFiles.map((file) => `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`),
    ]);
  };

  const handleFileRemove = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFileNames((prevFileNames) => prevFileNames.filter((_, i) => i !== index));
  };

  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200 gap-6">
        <TopMenu boldGrayText="티켓 생성" rightText="템플릿 리스트 / 템플릿 생성" onClick={() => setIsTemplateOpen(!isTemplateOpen)} />
        <div className="flex flex-col bg-bg-1 p-6 gap-8 min-w-[600px]">
          <TicketPreview />
          <TicketOptions />
          {firstCategory && secondCategory && mustDescription && (
            <div className="flex items-center text-body-regular gap-3">
              <ReferredIcon />
              필수 입력 사항:
              <div className="text-error ">{mustDescription}</div>
            </div>
          )}
          <div className="flex flex-col gap-3 text-body-bold whitespace-nowrap">
            <div className="flex gap-10 items-center">
              <div className="flex items-center gap-1">
                마감 기한 <RequiredIcon />
              </div>
              <div className={`flex items-center gap-5 p-2 px-8 bg-white border border-gray-2`}>
                <input type="date" value={dueDate} onChange={handleDueDateChange} className="w-28 text-gray-6 text-body-regular" />
                <input
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="w-24 text-gray-6 text-body-regular"
                />
              </div>
            </div>
            <NewTicketContent />
          </div>
          <div className="flex flex-col w-full gap-3 items-start">
            <div className="flex gap-4 items-center">
              <button
                type="button"
                className="rounded-md py-1 px-6 text-caption-regular border border-main hover:bg-main hover:text-white"
                onClick={() => fileInputRef.current?.click()}
              >
                첨부파일 첨부
              </button>
              {files.length > 4 && (
                <div className=" bg-gray-1 border border-gray-2 rounded-md py-1 px-3 text-[10px] text-error shadow-md">
                  최대 5개의 파일만 선택할 수 있습니다.
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              {fileNames.map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="border border-gray-2 text-caption-regular bg-white px-2 py-1 rounded w-[400px] truncate">{name}</span>
                  <button
                    type="button"
                    className="text-error text-[10px] font-regular hover:font-bold"
                    onClick={() => handleFileRemove(index)}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              multiple
              ref={fileInputRef}
              style={{display: 'none'}}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <button onClick={onClickBtn} className="btn mb-4">
            티켓 생성
          </button>
        </div>
      </div>
      <TemplateContainer isOpen={isTemplateOpen} onClose={() => setIsTemplateOpen(false)} />
      {isModalOpen && (
        <Modal
          title={
            modalMessage.includes('입력해주세요')
              ? '필수 입력 항목 누락'
              : modalMessage.includes('이동')
                ? `티켓 번호 - #${ticketId}`
                : modalMessage.includes('진행')
                  ? '티켓을 생성하시겠습니까?'
                  : '티켓 생성 불가'
          }
          content={modalMessage}
          backBtn="닫기"
          onBackBtnClick={() => {
            setIsModalOpen(false);
          }}
          checkBtn={
            modalMessage.includes('입력해주세요') || modalMessage.includes('마감기한') || modalMessage.includes('잘못') ? undefined : '확인'
          }
          onBtnClick={
            modalMessage.includes('입력해주세요') || modalMessage.includes('마감기한') || modalMessage.includes('잘못')
              ? undefined
              : confirmSubmit
          }
        />
      )}
    </div>
  );
}
