import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import TicketSmall from './TicketSmall';
import {useState} from 'react';
import {ticketDummy} from '../../../data/ticketData';

// 임시 타입
export interface TicketDataProps {
  id: string;
  category: string;
  subCategory: string;
  title: string;
  content: string;
  deadline: string;
  assignee: string;
  assigneeOptions: string[];
  isUrgent: boolean;
  status: 'wait' | 'ing' | 'end'; // 상태 필드 추가
}

export default function TicketPersonalManageList() {
  // 초기 상태 설정
  const initialTickets = {
    wait: ticketDummy.slice(0, 5).map((ticket) => ({
      ...ticket,
      status: 'wait' as const,
    })),
    ing: ticketDummy.slice(5, 10).map((ticket) => ({
      ...ticket,
      status: 'ing' as const,
    })),
    end: ticketDummy.slice(10).map((ticket) => ({
      ...ticket,
      status: 'end' as const,
    })),
  };

  const [tickets, setTickets] = useState<Record<string, TicketDataProps[]>>(initialTickets);

  // 드래그 앤 드롭 핸들러

  const onDragEnd = (result: any) => {
    console.log(result);
    if (!result.destination) return;

    const sourceList = [...tickets[result.source.droppableId]];
    const destList = [...tickets[result.destination.droppableId]];
    const [movedItem] = sourceList.splice(result.source.index, 1);

    if (result.source.droppableId !== result.destination.droppableId) {
      movedItem.status = result.destination.droppableId as 'wait' | 'ing' | 'end';
    }

    destList.splice(result.destination.index, 0, movedItem);

    setTickets({
      ...tickets,
      [result.source.droppableId]: sourceList,
      [result.destination.droppableId]: destList,
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex items-center w-full h-15 bg-gray-1 border border-gray-2 rounded py-4 px-[30px] mb-6">
        <h1 className="text-title-bold">나의 티켓 관리</h1>
      </div>

      <div className="w-full bg-gray-18 grid grid-cols-3 gap-x-2 py-5 px-9">
        {Object.entries(tickets).map(([status, items]) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-2 py-[26px] px-4 rounded border border-gray-2"
              >
                <header className="flex items-center gap-3">
                  <div
                    className={`w-[8px] h-[8px] rounded-full ${
                      status === 'wait' ? 'bg-orange' : status === 'ing' ? 'bg-green' : 'bg-yellow'
                    }`}
                  />
                  <h1 className="text-subtitle">{status === 'wait' ? '대기' : status === 'ing' ? '진행중' : '완료'}</h1>
                </header>

                {/* 티켓 리스트 */}
                {items.map((ticket, index) => (
                  <Draggable key={ticket.id} draggableId={String(ticket.id)} index={index}>
                    {(provided) => (
                      <TicketSmall
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        id={ticket.id}
                        title={ticket.title}
                        deadline={ticket.deadline}
                        initialStatus={ticket.status}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
