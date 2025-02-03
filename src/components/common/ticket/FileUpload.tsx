import {useRef, useState} from 'react';

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const onClickFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex gap-10 text-body-bold items-center">
      첨부파일
      <button
        className="rounded-md py-1 px-6 text-caption-regular border border-main hover:bg-main hover:text-white"
        onClick={onClickFileUpload}
      >
        {/* todo 파일 업로드 로직 추가 */}
        첨부파일 첨부
      </button>
      {fileName && <span className="mt-2 text-caption-regular">{fileName}</span>}
      <input type="file" accept="image/*" ref={fileInputRef} style={{display: 'none'}} onChange={handleFileChange} />
    </div>
  );
}
