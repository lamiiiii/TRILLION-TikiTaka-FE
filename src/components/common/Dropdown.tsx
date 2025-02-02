import {useState} from 'react';

interface DropdownProps {
  label: string; // 드롭다운 버튼에 표시될 텍스트
  options: string[]; // 드롭다운 메뉴 항목
  onSelect: (value: string) => void; // 선택 시 호출되는 함수
  value?: string; // defaultSelected 대신 value를 사용
  defaultSelected?: string; // 기본 선택된 값
  paddingX?: string; // 드롭다운 버튼의 좌우 여백 (Tailwind 클래스)
  border?: boolean; // 드롭다운 border 유무
  textColor?: string; // 드롭다운 글씨 색상 (Tailwind 클래스)
  disabled?: boolean; // 드롭다운 비활성화
}

export default function DropDown({
  label,
  options,
  onSelect,
  value,
  defaultSelected = label,
  paddingX = 'px-4', // 기본 여백 값
  border = true,
  textColor = 'text-gray-15',
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* 드롭다운 버튼 */}
      <button
        className={`${border ? 'border border-gray-6' : 'border-none'} ${textColor === 'white' ? 'text-white' : 'text-gray-15'} rounded-md py-1 ${paddingX} text-gray-6 text-body-regular flex items-center gap-3 
        ${disabled ? 'bg-gray-1 text-gray-3 cursor-not-allowed' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="flex items-center leading-none">{value || label}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ml-auto ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute mt-1  bg-white border border-gray-3 rounded-md shadow-lg z-10 w-full">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-1.5 text-center cursor-pointer leading-none m-2 ${
                selected === option
                  ? 'bg-gray-1 text-caption-bold rounded-md mx-2 border border-gray-2 text-gray-15'
                  : 'text-gray-700 text-caption-regular hover:bg-gray-1 rounded-md'
              } `}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
