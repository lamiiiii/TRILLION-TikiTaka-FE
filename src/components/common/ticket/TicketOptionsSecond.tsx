import {useQuery} from '@tanstack/react-query';
import {useNewTicketStore} from '../../../store/store';
import DropDown from '../Dropdown';
import {RequiredIcon} from '../Icon';
import {getTicketTypes} from '../../../api/service/tickets';
import {useEffect, useState} from 'react';

export default function TicketOpstionsSecond() {
  const {manager, ticketType, template, setManager, setTicketType, setTemplate} = useNewTicketStore();
  const [ticketTypes, setTicketTypes] = useState<{typeId: number; typeName: string}[]>([]);

  // todo 담당자 조회 API가 없음

  const {data, isLoading, error} = useQuery({
    queryKey: ['types'],
    queryFn: async () => {
      const response = await getTicketTypes();
      return response;
    },
  });

  useEffect(() => {
    if (data) {
      setTicketTypes(data);
    }
  }, [data]);

  if (isLoading) return null;
  if (error) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="selection">
        <p className="w-12">담당자</p>
        <DropDown label="담당자" options={['alex', 'yeon', 'hohoho', 'juju']} value={manager} onSelect={(value) => setManager(value)} />
      </div>
      <div className="selection">
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
  );
}
