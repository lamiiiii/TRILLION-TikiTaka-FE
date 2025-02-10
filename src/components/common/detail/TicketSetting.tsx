import {useEffect, useState} from 'react';
import DropDown from '../Dropdown';
import {useTicketStore} from '../../../store/store';
import {PRIORITY} from '../../../constants/constants';
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {getTicketTypes, updateTicket, updateTicketDeadline, updateTicketManager, updateTicketPriority} from '../../../api/service/tickets';
import {getManagerList} from '../../../api/service/users';
import {getCategoryList} from '../../../api/service/categories';
import {useCreateMutation} from '../../../api/hooks/useCreateMutation';

interface TicketSettingProps {
  data: TicketDetails;
}

export default function TicketSetting({data}: TicketSettingProps) {
  const [selectedAssignee, setSelectedAssignee] = useState(data.managerName);
  const [primaryCategory, setPrimaryCategory] = useState(data.firstCategoryName);
  const [secondaryCategory, setSecondaryCategory] = useState(data.secondCategoryName);
  const [ticketType, setTicketType] = useState(data.typeName);
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string}>({});

  const [primaryCategoryId, setPrimaryCategoryId] = useState(data.firstCategoryId);
  const [secondaryCategoryId, setSecondaryCategoryId] = useState(data.secondCategoryId);
  const [ticketTypeId, setTicketTypeId] = useState(data.typeId);

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

  const updateTicketMutation = useCreateMutation(
    (params: UpdateTicketParams) => updateTicket(ticketId, params),
    '티켓 정보 변경에 실패했습니다. 다시 시도해 주세요.',
    ticketId
  );

  // 유저 정보 (담당자 리스트) 조회
  const {data: userData} = useQuery({
    queryKey: ['managers'],
    queryFn: getManagerList,
    select: (data) => data.users,
  });

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
  const handleAssigneeSelect = (selectedOption: string) => {
    const selectedUser = userData?.find((user: any) => user.username === selectedOption);
    if (selectedUser) {
      updateManagerMutation.mutate(selectedUser?.userId);
      setSelectedAssignee(selectedOption);
    }
  };
  const handlePrioritySelect = handleSelect(setPriority, updatePriorityMutation);
  const handleDeadlineChange = () => {
    const newDeadline = `${deadlineDate} ${deadlineTime}`;
    updateDeadlineMutation.mutate(newDeadline);
  };

  const updateTicketDetails = () => {
    const updateParams: UpdateTicketParams = {
      firstCategoryId: primaryCategoryId,
      secondaryCategoryId: secondaryCategoryId,
      typeId: ticketTypeId,
      title: data.title,
      description: data.description,
      urgent: data.urgent,
    };
    updateTicketMutation.mutate(updateParams);
  };

  const handlePrimaryCategorySelect = (selectedOption: string) => {
    const selectedCategory = categories.find((cat: any) => cat.primary.name === selectedOption);
    if (selectedCategory) {
      setPrimaryCategory(selectedOption);
      setPrimaryCategoryId(selectedCategory.primary.id);
      setSelectedFilters((prev) => ({...prev, '1차 카테고리': selectedOption}));
      updateTicketDetails();
    }
  };

  const handleSecondaryCategorySelect = (selectedOption: string) => {
    const selectedCategory = categories
      .find((cat: any) => cat.primary.name === selectedFilters['1차 카테고리'])
      ?.secondaries.find((secondary: any) => secondary.name === selectedOption);
    if (selectedCategory) {
      setSecondaryCategory(selectedOption);
      setSecondaryCategoryId(selectedCategory.id);
      updateTicketDetails();
    }
  };

  const handleTicketTypeSelect = (selectedOption: string) => {
    const selectedType = ticketData?.find((type: any) => type.typeName === selectedOption);
    if (selectedType) {
      setTicketType(selectedOption);
      setTicketTypeId(selectedType.id);
      updateTicketDetails();
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
            <div className="flex items-center gap-2">
              <DropDown
                label="담당자"
                value={selectedAssignee}
                options={userData?.map((user: any) => user.username) || []}
                defaultSelected={selectedAssignee}
                onSelect={handleAssigneeSelect}
                border={false}
              />
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
