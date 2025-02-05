import {useRef, useState} from 'react';
import Profile from '../Profile';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createTicketComment} from '../../../api/service/tickets';
import {useParams} from 'react-router-dom';

export default function CommentInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {id} = useParams();
  const ticketId = Number(id);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return createTicketComment(ticketId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticketComments', ticketId]});
      if (textareaRef.current) textareaRef.current.value = '';
      setFiles([]);
      setFileNames([]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = textareaRef.current?.value || '';

    const formData = new FormData();
    formData.append('content', content);
    files.forEach((file) => {
      formData.append('files', file);
    });

    mutation.mutate(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const MAX_FILES = 5;

    const selectedFiles = Array.from(event.target.files || []);

    // 파일 개수 검증
    if (selectedFiles.length > MAX_FILES) {
      alert(`최대 ${MAX_FILES}개의 파일만 선택할 수 있습니다.`);
      return;
    }

    // 파일 크기 검증
    const validFiles = selectedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} 파일 크기가 10MB를 초과했습니다.`);
        return false;
      }
      return true;
    });

    setFiles(validFiles);
    setFileNames(validFiles.map((file) => file.name));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="flex gap-3 items-center">
        <button
          type="button"
          className="rounded-md py-1 px-6 text-caption-regular border border-main hover:bg-main hover:text-white"
          onClick={() => fileInputRef.current?.click()}
        >
          첨부파일 첨부
        </button>
        <div className="flex gap-2">
          {fileNames.map((name, index) => (
            <span key={index} className="text-caption-regular bg-gray-100 px-2 py-1 rounded">
              {name}
            </span>
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
      <div className="relative mt-3">
        <div className="flex gap-2 mb-2">
          <Profile name="yeon" size="sm" backgroundColor="manager" />
          <textarea
            ref={textareaRef}
            className="w-full h-[78px] text-subtitle-regular border border-gray-2 rounded-[4px] py-3 px-4 focus:border-main"
            placeholder="댓글 추가"
          />
        </div>
        <button type="submit" className="absolute right-0 main-btn" disabled={mutation.isPending}>
          {mutation.isPending ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
}
