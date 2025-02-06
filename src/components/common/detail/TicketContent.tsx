import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {deleteTicket, updateTicket} from '../../../api/service/tickets';
import Modal from '../Modal';

interface TicketContentProps {
  data: TicketDetails;
}

export default function TicketContent({data}: TicketContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(data?.description);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {id} = useParams();
  const ticketId = Number(id);
  const queryClient = useQueryClient();

  // 티켓 세부 내용 수정
  //FIX: typeId, primaryCategoryId, secondaryCategoryId 수정 필요
  const updateMutation = useMutation({
    mutationFn: () =>
      updateTicket(ticketId, {
        title: data.title || '',
        description: editedContent || '',
        urgent: data.urgent || false,
        typeId: 1,
        primaryCategoryId: 1,
        secondaryCategoryId: 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticketDetails', ticketId]});
      setIsEditing(false);
    },
    onError: (error) => {
      console.error('티켓 내용 수정 실패:', error);
      alert('티켓 내용 수정에 실패했습니다. 다시 시도해 주세요.');
      setIsEditing(false);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: () => deleteTicket(ticketId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tickets']});
      // 티켓 삭제 후 목록 페이지로 이동하는 로직 추가 필요
    },
    onError: () => {
      alert('티켓 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMutation.mutate();
  };

  const handleCancel = () => {
    setEditedContent(data?.description);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate();
    setShowDeleteModal(false);
  };
  return (
    <div className="relative">
      <div className=" flex justify-end gap-2 text-body-regular ">
        {isEditing ? (
          <>
            <button className="text-gray-8 hover:text-gray-15" onClick={handleSave}>
              저장
            </button>
            <button className="text-gray-8 hover:text-gray-15" onClick={handleCancel}>
              취소
            </button>
          </>
        ) : (
          <>
            <button className="text-gray-8 hover:text-gray-15" onClick={handleEdit}>
              편집
            </button>
            <button className="text-gray-8 hover:text-gray-15" onClick={handleDelete}>
              삭제
            </button>
          </>
        )}
      </div>
      {isEditing ? (
        <textarea
          className="w-full h-[400px] p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <div className="w-full h-[400px] overflow-scroll p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
          {data?.description}
        </div>
      )}
      {showDeleteModal && (
        <Modal
          title="이 티켓을 삭제하시겠습니까?"
          backBtn="취소"
          onBackBtnClick={() => setShowDeleteModal(false)}
          checkBtn="삭제"
          onBtnClick={confirmDelete}
        />
      )}
    </div>
  );
}
