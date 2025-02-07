import {useQuery} from '@tanstack/react-query';
import {useTemplateStore} from '../../../store/store';
import DropDown from '../Dropdown';
import {RequiredIcon} from '../Icon';
import {getTicketTypes} from '../../../api/service/tickets';
import {useEffect, useState} from 'react';
import { getManagerList } from '../../../api/service/users';

export default function TemplateOptionsSecond() {
  const {manager, ticketType, setManager, setTicketType} = useTemplateStore();
  const [ticketTypes, setTicketTypes] = useState<{typeId: number; typeName: string}[]>([]);

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['managers'],
    queryFn: getManagerList,
    select: (data) => data.users,
  });

  const {
    data: ticketData,
    isLoading: isTicketLoading,
    error: ticketError,
  } = useQuery({
    queryKey: ['types'],
    queryFn: getTicketTypes,
  });

  useEffect(() => {
    if (ticketData) {
      setTicketTypes(ticketData);
    }
  }, [ticketData]);

  if (isTicketLoading || isUserLoading) return null;
  if (ticketError || userError) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="selection-2">
        <p className="w-12">담당자</p>
        <DropDown
          label="담당자"
          options={userData?.map((user) => user.username) || []}
          value={manager?.username}
          onSelect={(value) => {
            const selectedUser = userData?.find((user) => user.username === value);
            if (selectedUser) {
              setManager(selectedUser);
            }
          }}
        />{' '}
      </div>
      <div className="selection-2">
        <div className="flex items-center gap-1 w-12">
          유형 <RequiredIcon />
        </div>
        <DropDown
          label="유형"
          options={ticketTypes.map((t) => t.typeName)}
          value={ticketType.typeName}
          onSelect={(value) => {
            const selectedType = ticketTypes.find((t) => t.typeName === value);
            if (selectedType) {
              setTicketType(selectedType);
            }
          }}
        />
      </div>
    </div>
  );
}
