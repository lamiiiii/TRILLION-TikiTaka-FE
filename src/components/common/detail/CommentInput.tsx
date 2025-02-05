import {useRef, useState} from 'react';
import DropDown from '../Dropdown';
import Profile from '../Profile';

export default function CommentInput() {
  const [selectedManager, setSelectedManager] = useState('@Alex');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const handleManagerSelect = (selectedOption: string) => {
    setSelectedManager(selectedOption);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex gap-3">
        <DropDown label="@mention" options={['@Alex', '@Jojo', '@Yeon']} defaultSelected={selectedManager} onSelect={handleManagerSelect} />
        <button
          className="rounded-md py-1 px-6 text-caption-regular border border-main hover:bg-main hover:text-white"
          onClick={handleFileButtonClick}
        >
          첨부파일 첨부
        </button>
        {fileName && <span className="mt-2 text-caption-regular">{fileName}</span>}
        <input type="file" accept="image/*" ref={fileInputRef} style={{display: 'none'}} onChange={handleFileChange} />
      </div>
      <div className="relative">
        <div className="flex gap-2 mt-3 mb-2">
          <Profile name="yeon" size="sm" backgroundColor="manager" />
          <textarea
            className="w-full h-[78px] text-subtitle-regular border border-gray-2 rounded-[4px] py-3 px-4 focus:border-main "
            placeholder="댓글 추가"
          />
        </div>
        <button className="absolute right-0 main-btn">저장</button>
      </div>
    </div>
  );
}
