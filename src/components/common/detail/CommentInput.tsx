import {useRef, useState} from 'react';
import Profile from '../Profile';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createTicketComment} from '../../../api/service/tickets';
import {useParams} from 'react-router-dom';
import {useUserStore} from '../../../store/store';
import DOMPurify from 'dompurify';
import {MAX_FILE_SIZE, MAX_FILES} from '../../../constants/constants';
import {useLimitedInput} from '../../../hooks/useInputLimit';

export default function CommentInput() {
  const [content, setContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {userId} = useUserStore();

  const {id} = useParams();
  const ticketId = Number(id);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return createTicketComment(ticketId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticketComments', ticketId]});
      setContent(''); // 내용 초기화
      setFiles([]);
      setFileNames([]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const jsonData = {content: content.slice(0, 1000)};
    console.log(jsonData);
    const formData = new FormData();

    // JSON 데이터를 Blob으로 변환하여 추가
    const jsonBlob = new Blob([JSON.stringify(jsonData)], {type: 'application/json'});
    formData.append('request', jsonBlob);

    files.forEach((file) => {
      formData.append('files', file);
    });

    mutation.mutate(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length > MAX_FILES) {
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

    setFiles(validFiles);
    setFileNames(validFiles.map((file) => file.name));
  };

  const contentInput = useLimitedInput({
    maxLength: 1000,
    initialValue: content,
    onLimitExceed: () => alert('내용은 최대 1000자까지 입력할 수 있습니다.'),
    onChange: (value) => setContent(value),
  });

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
          <Profile userId={userId} size="md" />
          <textarea
            ref={textareaRef}
            className="comment-textarea"
            placeholder="댓글 추가"
            value={contentInput.value}
            onChange={(e) => {
              const sanitizedValue = DOMPurify.sanitize(e.target.value);
              contentInput.setValue(sanitizedValue);
              setContent(sanitizedValue);
            }}
            style={{resize: 'none'}}
          />
        </div>
        <button type="submit" className="absolute right-0 main-btn" disabled={mutation.isPending}>
          {mutation.isPending ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
}
