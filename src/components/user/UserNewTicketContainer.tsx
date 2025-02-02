import {useRef, useState} from 'react';
import {SmDownIcon} from '../common/Icon';
import TopMenu from '../common/TopMenu';

export default function UserNewTicketContainer() {
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
    <div className="top-container">
      <div className="flex flex-col max-w-1200 gap-6">
        <TopMenu boldGrayText="티켓 생성" rightText="템플릿 리스트 / 템플릿 생성" linkTo="/user/templates" />

        <div className="flex flex-col bg-bg-1 p-6 gap-10 min-w-[600px]">
          {/* 티켓 미리보기 */}
          <div className="preview">
            <p className="text-subtitle text-gray-15">티켓 미리보기</p>
            <div className="w-full bg-gray-1 border border-gray-2 rounded p-4 flex justify-between text-subtitle-regular">
              <div className="flex gap-4 items-center">
                <p>#112</p>
                <div className="flex flex-col w-32">
                  <p>1차 카테고리</p>
                  <p className="selection-text">2차 카테고리</p>
                </div>
                <div className="flex flex-col w-80">
                  <p>[유형] 요청 제목</p>
                  <p className="selection-text">요청 내용</p>
                </div>
              </div>
              <div className="flex gap-8 items-center">
                <p>2025.02.04</p>
                <div className="bg-white border border-gray-2 py-1 px-8 my-2 rounded items-center">담당자</div>
              </div>
            </div>
          </div>

          {/* 티켓 내용 작성 */}
          <div className="flex gap-20 px-3 text-body-bold text-gray-15">
            <div className="flex flex-col gap-3">
              <div className="flex gap-9 items-center">
                <p className="w-16">긴급 티켓</p>
                <div className="flex gap-3 items-center">
                  <input type="checkbox" className="w-4 h-4 border-gray-6" />
                  <p className="selection-text">긴급</p>
                </div>
              </div>
              <div className="selection">
                <p className="w-16">1차 카테고리</p>
                <div className="w-28 dropBtn">
                  <p className="selection-text">1차 카테고리</p>
                  <SmDownIcon />
                </div>
              </div>
              <div className="selection">
                <p className="w-16">2차 카테고리</p>
                <div className="w-28 dropBtn">
                  <p className="selection-text">2차 카테고리</p>
                  <SmDownIcon />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="selection">
                <p className="w-12">담당자</p>
                <div className="w-24 dropBtn">
                  <p className="selection-text">담당자</p>
                  <SmDownIcon />
                </div>
              </div>
              <div className="selection">
                <p className="w-12">유형</p>
                <div className="w-24 dropBtn">
                  <p className="selection-text">유형</p>
                  <SmDownIcon />
                </div>
              </div>
              <div className="selection">
                <p className="w-12">템플릿</p>
                <div className="w-24 dropBtn">
                  <p className="selection-text">템플릿</p>
                  <SmDownIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-body-bold">
            <div className="flex gap-10 items-center">
              <p>마감 기한</p>
              <input
                type="text"
                className="text-subtitle-regular border border-gray-2 bg-white py-2 px-4"
                placeholder="마감 기한을 선택해주세요"
              />
            </div>
            <div className="flex gap-10 items-center">
              <p>요청 제목</p>
              <textarea
                className="w-[660px] text-subtitle-regular border border-gray-2 bg-white py-2 px-4"
                placeholder="요청 사항에 대한 제목을 입력해주세요"
              />
            </div>
            <div className="flex gap-10 items-center">
              <p>요청 내용</p>
              <textarea
                className="w-[660px] text-subtitle-regular border border-gray-2 bg-white py-2 px-4"
                placeholder="요청 내용을 입력해주세요"
              />
            </div>
          </div>
          <div className="flex gap-10 text-body-bold items-center">
            첨부파일
            <button
              className="rounded-md py-1 px-6 text-caption-regular border border-main hover:bg-main hover:text-white"
              onClick={onClickFileUpload}
            >
              첨부파일 첨부
            </button>
            {fileName && <span className="mt-2 text-caption-regular">{fileName}</span>}
            <input type="file" accept="image/*" ref={fileInputRef} style={{display: 'none'}} onChange={handleFileChange} />
          </div>
          <div className="flex w-full justify-center">
            <button onClick={() => console.log('')} className="h-full btn">
              티켓 생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
