import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {deleteTicket} from '../../../api/service/tickets';
import Modal from '../Modal';
import MarkdownPreview from '../MarkdownPreview';
import {useUserStore} from '../../../store/store';

interface TicketContentProps {
  data: TicketDetails;
}

export default function TicketContent({data}: TicketContentProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {id} = useParams();
  const ticketId = Number(id);
  const queryClient = useQueryClient();

  const {userId} = useUserStore();

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

  const handleDelete = () => {
    if (data.status === 'PENDING') {
      alert('티켓 대기중 상태에서는 티켓 삭제가 불가능합니다.');
    } else {
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = () => {
    deleteMutation.mutate();
    setShowDeleteModal(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-end gap-2 text-body-regular">
        {location.pathname.startsWith('/user') && data?.requesterId === userId && (
          // FIX: 귤님 여기 링크 수정해야합니다!
          <Link to="/user/newticket" className="text-gray-8 hover:text-gray-15">
            편집
          </Link>
        )}
        {data?.requesterId === userId && (
          <button className="text-gray-8 hover:text-gray-15" onClick={handleDelete}>
            삭제
          </button>
        )}
      </div>
      <div className="w-full h-[400px] overflow-scroll p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
        {/* 여기에서 마크다운을 HTML로 변환하고 안전하게 렌더링 */}
        <MarkdownPreview content={data?.description || ''} />
      </div>
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
