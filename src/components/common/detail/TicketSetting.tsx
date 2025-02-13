import {useEffect, useState} from 'react';
import DropDown from '../Dropdown';
import {useTicketStore} from '../../../store/store';
import {PRIORITY} from '../../../constants/constants';
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {
  getTicketTypes,
  updateTicketCategory,
  updateTicketDeadline,
  updateTicketManager,
  updateTicketPriority,
  updateTicketType,
} from '../../../api/service/tickets';
import {getCategoryList} from '../../../api/service/categories';
import {useCreateMutation} from '../../../api/hooks/useCreateMutation';
import ManagerSelector from '../selector/ManagerSelector';

interface TicketSettingProps {
  data: TicketDetails;
}

export default function TicketSetting({data}: TicketSettingProps) {
  const [selectedAssignee] = useState(data.managerName);
  const [primaryCategory, setPrimaryCategory] = useState(data.firstCategoryName);
  const [secondaryCategory, setSecondaryCategory] = useState(data.secondCategoryName);
  const [ticketType, setTicketType] = useState(data.typeName);
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string}>({});

  const [primaryCategoryId, setPrimaryCategoryId] = useState(data.firstCategoryId);
  const [_secondaryCategoryId, setSecondaryCategoryId] = useState(data.secondCategoryId);

  const {id} = useParams();
  const ticketId = Number(id);

  const priority = useTicketStore((state) => state.priority);
  const setPriority = useTicketStore((state) => state.setPriority);

  // 마감기한 데이터 변환
  useEffect(() => {
    if (data.deadline) {
      const [date, time] = data.deadline.split(' ');
      setDeadlineDate(date);
      setDeadlineTime(time);
    }
  }, [data.deadline]);

  const updatePriorityMutation = useCreateMutation(
    (newPriority: string) => updateTicketPriority(ticketId, newPriority),
    '티켓 우선순위 변경에 실패했습니다. 다시 시도해 주세요.',
    ticketId
  );

  const updateManagerMutation = useCreateMutation(
    (managerId: number) => updateTicketManager(ticketId, managerId),
    '티켓 담당자 변경에 실패했습니다. 다시 시도해 주세요.',
    ticketId
  );

  const updateDeadlineMutation = useCreateMutation(
    (deadline: string) => updateTicketDeadline(ticketId, deadline),
    '티켓 마감기한 변경에 실패했습니다. 다시 시도해 주세요.',
    ticketId
  );

  const updateCategoryMutation = useCreateMutation<UpdateTicketCategoryParams>(
    (categoryIds: UpdateTicketCategoryParams) => updateTicketCategory(ticketId, categoryIds),
    '카테고리 변경에 실패했습니다. 다시 시도해 주세요.',
    ticketId
  );

  const updateTypeMutation = useCreateMutation<UpdateTicketTypeParams>(
    (params: UpdateTicketTypeParams) => updateTicketType(ticketId, params),
    '티켓 유형 변경에 실패했습니다. 다시 시도해 주세요.',
    ticketId
  );

  // 티켓 타입 데이터 조회
  const {data: ticketData} = useQuery({
    queryKey: ['types'],
    queryFn: getTicketTypes,
  });

  // 카테고리 데이터 조회
  const {data: categories = []} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const primaryCategories = await getCategoryList();
      const secondaryRequests = primaryCategories.map(async (primary) => {
        const secondaries = await getCategoryList(primary.id);
        return {primary, secondaries};
      });

      return Promise.all(secondaryRequests);
    },
  });

  const handleSelect = (setter: (value: any) => void, mutation?: any) => (selectedOption: string) => {
    setter(selectedOption);
    if (mutation) {
      mutation.mutate(selectedOption);
    }
  };
  const handleManagerSelect = (managerId: number) => {
    updateManagerMutation.mutate(managerId);
  };

  const handlePrioritySelect = handleSelect(setPriority, updatePriorityMutation);
  const handleDeadlineChange = () => {
    const newDeadline = `${deadlineDate} ${deadlineTime}`;
    updateDeadlineMutation.mutate(newDeadline);
  };

  const handlePrimaryCategorySelect = (selectedOption: string) => {
    const selectedCategory = categories.find((cat: any) => cat.primary.name === selectedOption);
    if (selectedCategory) {
      setPrimaryCategory(selectedOption);
      const newPrimaryCategoryId = selectedCategory.primary.id;
      setPrimaryCategoryId(newPrimaryCategoryId);
      setSelectedFilters((prev) => ({...prev, '1차 카테고리': selectedOption}));

      // 2차 카테고리 초기화
      setSecondaryCategory('');
      setSecondaryCategoryId(0); // 또는 적절한 초기값
    }
  };

  const handleSecondaryCategorySelect = (selectedOption: string) => {
    const selectedCategory = categories
      .find((cat: any) => cat.primary.name === selectedFilters['1차 카테고리'])
      ?.secondaries.find((secondary: any) => secondary.name === selectedOption);
    if (selectedCategory) {
      setSecondaryCategory(selectedOption);
      const newSecondaryCategoryId = selectedCategory.id;
      setSecondaryCategoryId(newSecondaryCategoryId);
      updateCategoryMutation.mutate({firstCategoryId: primaryCategoryId, secondCategoryId: newSecondaryCategoryId});
    }
  };

  const handleTicketTypeSelect = (selectedOption: string) => {
    const selectedType = (ticketData as TicketType[])?.find((type) => String(type.typeName) === String(selectedOption));
    console.log('selectedType', selectedType); // Check what is being selected

    if (selectedType) {
      const typeId = Number(selectedType.typeId);
      console.log(typeId);
      updateTypeMutation.mutate({ticketTypeId: typeId});
      setTicketType(selectedOption);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-body-bold">티켓 설정</label>
      <div className="w-full p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
        <div className="grid grid-cols-[4fr_6fr] gap-4">
          <div className="text-subtitle flex flex-col gap-4">
            <p>담당자</p>
            <p>마감 기한</p>
            {location.pathname.startsWith('/manager') && <p>Priority</p>}
            <p>1차 카테고리</p>
            <p>2차 카테고리</p>
            <p>티켓 유형</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-4">
              <ManagerSelector selectedManagerName={selectedAssignee} onManagerSelect={handleManagerSelect} />
            </div>
            <div className="flex itmes-center ml-3">
              <input
                type="date"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                onBlur={handleDeadlineChange}
                className={`${deadlineDate ? 'text-gray-15' : 'text-gray-6'} w-min text-body-regular`}
                disabled={updateDeadlineMutation.isPending}
              />
              <input
                type="time"
                value={deadlineTime}
                onChange={(e) => setDeadlineTime(e.target.value)}
                onBlur={handleDeadlineChange}
                className={`${deadlineTime ? 'text-gray-15' : 'text-gray-6'} w-min text-body-regular`}
                disabled={updateDeadlineMutation.isPending}
              />
            </div>
            {location.pathname.startsWith('/manager') && (
              <DropDown label="우선 순위" options={PRIORITY} value={priority} onSelect={handlePrioritySelect} border={false} />
            )}
            <DropDown
              label="1차 카테고리"
              options={categories?.map((cat: any) => cat.primary.name)}
              value={primaryCategory}
              onSelect={handlePrimaryCategorySelect}
              border={false}
            />
            <DropDown
              label="2차 카테고리"
              options={
                selectedFilters['1차 카테고리']
                  ? (categories
                      .find((cat: any) => cat.primary.name === selectedFilters['1차 카테고리'])
                      ?.secondaries?.map((secondary: any) => secondary.name) ?? [])
                  : []
              }
              value={secondaryCategory}
              onSelect={handleSecondaryCategorySelect}
              border={false}
            />
            <DropDown
              label="타입"
              options={ticketData?.map((type: any) => type.typeName)}
              value={ticketType}
              onSelect={handleTicketTypeSelect}
              border={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
