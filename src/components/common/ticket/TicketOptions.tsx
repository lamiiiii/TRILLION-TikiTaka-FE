import {useMemo} from 'react';
import DropDown from '../../common/Dropdown';
import {categoriesDummy} from '../../../data/newTicketData';
import {WhiteCheckIcon} from '../../common/Icon';
import {useNewTicketStore} from '../../../store/store';

export default function TicketOptions() {
  const {
    isUrgent,
    firstCategory,
    secondCategory,
    manager,
    ticketType,
    template,
    setIsUrgent,
    setFirstCategory,
    setSecondCategory,
    setManager,
    setTicketType,
    setTemplate,
  } = useNewTicketStore();

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsUrgent(isChecked);
  };

  // 1차 카테고리 목록 필터링
  const firstCategoryOptions = useMemo(() => {
    return categoriesDummy.filter((c) => !c.hasOwnProperty('firstId'));
  }, []);

  // 선택한 1차 카테고리에 해당하는 2차 카테고리 필터링
  const secondCategoryOptions = useMemo(() => {
    return categoriesDummy.filter((c) => c.firstId === firstCategory?.id);
  }, [firstCategory]);

  return (
    <div className="flex gap-20 px-3 text-body-bold text-gray-15">
      <div className="flex flex-col gap-3">
        <div className="flex gap-9 items-center h-[26px]">
          <p className="w-16">긴급 티켓</p>
          <div className="flex gap-3 items-center">
            <label
              className={`flex items-center justify-center w-4 h-4 border rounded-md cursor-pointer 
                    ${isUrgent ? 'bg-error border-error' : 'border-gray-2 hover:border-error'}`}
            >
              <input type="checkbox" checked={isUrgent} onChange={checkboxChange} className="hidden" />
              {isUrgent && <WhiteCheckIcon />}
            </label>
            <p className={` ${isUrgent ? 'text-error text-body-bold' : 'text-gray-6 text-body-regular'}`}>긴급</p>
          </div>
        </div>
        <div className="selection">
          <p className="w-16">1차 카테고리</p>
          <DropDown
            label="1차 카테고리"
            options={firstCategoryOptions.map((category) => category.name)}
            value={firstCategory?.name}
            onSelect={(selectedName) => {
              const selectedCategory = firstCategoryOptions.find((cat) => cat.name === selectedName);
              setFirstCategory(selectedCategory ?? null);
              setSecondCategory(null);
            }}
          />
        </div>
        <div className="selection">
          <p className="w-16">2차 카테고리</p>
          <DropDown
            label="2차 카테고리"
            options={secondCategoryOptions.map((category) => category.name)}
            value={secondCategory?.name}
            onSelect={(selectedName) => {
              const selectedCategory = secondCategoryOptions.find((cat) => cat.name === selectedName);
              setSecondCategory(selectedCategory ?? null);
            }}
            disabled={!firstCategory}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="selection">
          <p className="w-12">담당자</p>
          <DropDown label="담당자" options={['alex', 'yeon', 'hohoho', 'juju']} value={manager} onSelect={(value) => setManager(value)} />
        </div>
        <div className="selection">
          <p className="w-12">유형</p>
          <DropDown
            label="유형"
            options={['생성', '수정', '삭제', '오류', '기타']}
            value={ticketType}
            onSelect={(value) => setTicketType(value)}
          />
        </div>
        <div className="selection">
          <p className="w-12">템플릿</p>
          <DropDown
            label="템플릿"
            options={['네트워크 기본 입력 필드 설정', '방화벽', 'CORS 포트 번호']}
            value={template}
            onSelect={(value) => setTemplate(value)}
          />
        </div>
      </div>
      <div className="flex h-full items-end">
        <div className="h-8 bg-gray-1 border border-gray-2 rounded-full py-1 px-4 text-body-bold w-fit mx-3">
          2차 카테고리 선택 시 해당 카테고리 템플릿이 적용됩니다.
        </div>
      </div>
    </div>
  );
}
