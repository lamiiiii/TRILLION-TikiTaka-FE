import {useState} from 'react';
import Profile from '../Profile';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteTicketComment, updateTicketComment} from '../../../api/service/tickets';
import {useParams} from 'react-router-dom';
import Modal from '../Modal';

interface CommentItemProps {
  commentId: number;
  name: string;
  content: string;
  files?: File[];
  createdAt: string;
}

export default function CommentItem({commentId, name, content, files, createdAt}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {id} = useParams();
  const ticketId = Number(id);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: () => updateTicketComment(ticketId, commentId, editedContent),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticketComments', ticketId]});
      setIsEditing(false);
    },
    onError: () => {
      alert('댓글 수정에 실패했습니다. 다시 시도해 주세요.');
      setIsEditing(false); // 편집 모드 취소
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTicketComment(ticketId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticketComments', ticketId]});
    },
    onError: () => {
      alert('댓글 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMutation.mutate();
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate();
    setShowDeleteModal(false);
  };

  return (
    <div className="flex gap-3 mt-10">
      <Profile name={name} backgroundColor="user" size="sm" />
      <div className="w-full flex flex-col gap-2">
        {files?.map((file, index) => (
          <a key={index} href={URL.createObjectURL(file)} className="text-blue-500 hover:underline block">
            {file.name}
          </a>
        ))}
        <div className="flex items-center gap-3">
          <p className="text-gray-16 text-body-bold">{name}</p>
          <div className="w-full flex justify-between text-body-regular">
            <div className="flex gap-1 text-gray-8 ">
              {isEditing ? (
                <>
                  <button className="hover:text-gray-15" onClick={handleSave}>
                    저장
                  </button>
                  <button className="hover:text-gray-15" onClick={handleCancel}>
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button className="hover:text-gray-15" onClick={handleEdit}>
                    편집
                  </button>
                  <button className="hover:text-gray-15" onClick={handleDelete}>
                    삭제
                  </button>
                </>
              )}
            </div>
            <p className="text-caption-regular">{createdAt}</p>
          </div>
        </div>
        {isEditing ? (
          <textarea className="comment-textarea" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
        ) : (
          <p className="text-subtitle-regular">{content}</p>
        )}
      </div>
      {showDeleteModal && (
        <Modal
          title="해당 댓글을 삭제하시겠습니까?"
          backBtn="취소"
          onBackBtnClick={() => setShowDeleteModal(false)}
          checkBtn="삭제"
          onBtnClick={confirmDelete}
        />
      )}
    </div>
  );
}
