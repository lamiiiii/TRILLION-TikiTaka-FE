import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import {getTicketStatusCount} from '../../../api/service/tickets';
import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';

const COLORS = ['#F0C000', '#FFDF5F', '#FFD700', '#FFA500', '#F4C2C1'];

export default function UserCountAnalytics() {
  const {data: ticketStatusCount} = useQuery({
    queryKey: ['ticketStatusCount'],
    queryFn: getTicketStatusCount,
  });

  const chartData = useMemo(() => {
    if (!ticketStatusCount) return [];
    return [
      {name: '대기중', ticket: ticketStatusCount.pending || 0},
      {name: '진행중', ticket: ticketStatusCount.inProgress || 0},
      {name: '검토중', ticket: ticketStatusCount.reviewing || 0},
      {name: '완료', ticket: ticketStatusCount.completed || 0},
      {name: '긴급', ticket: ticketStatusCount.urgent || 0},
    ];
  }, [ticketStatusCount]);

  return (
    <div className="flex flex-col w-full bg-gray-18 p-5">
      <h1 className="text-subtitle">나의 요청 티켓 현황</h1>
      <div className="flex items-center gap-20 ">
        <section className="w-[200px] h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="ticket">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px',
                }}
                formatter={(value, name) => [`${value}건`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </section>

        <section className="grid grid-cols-2 gap-3 text-subtitle">
          <div className="space-y-4">
            <div>전체</div>
            {chartData.map((item) => (
              <div key={item.name}>{item.name}</div>
            ))}
          </div>

          <div className="text-right text-main2-3 space-y-4">
            <div>{ticketStatusCount?.total || 0}건</div>
            {chartData.map((item) => (
              <div key={item.name}>{item.ticket}건</div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
