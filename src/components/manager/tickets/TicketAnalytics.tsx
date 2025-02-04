import {Bar, BarChart, LabelList, XAxis} from 'recharts';

// 임시 데이터 - 일별 티켓 처리 건수
const data = [
  {name: 'mon', ticket: 100},
  {name: 'tue', ticket: 30},
  {name: 'wed', ticket: 50},
  {name: 'thus', ticket: 60},
  {name: 'fri', ticket: 40},
  {name: 'sat', ticket: 40},
  {name: 'sun', ticket: 50},
];

export default function TicketAnalytics() {
  return (
    <div className="flex items-center gap-6 w-full bg-gray-18 p-5">
      <section>
        <p className="pl-2 text-caption-regular text-gray-14">단위: 건</p>
        <BarChart width={240} height={120} data={data}>
          <XAxis dataKey="name" tick={{fontSize: 14}} axisLine={false} tickLine={false} />
          <Bar dataKey="ticket" fill="#F6D47A" radius={100}>
            <LabelList dataKey="ticket" position="center" fill="#FFFFFF" height={20} fontSize={10} />
          </Bar>
        </BarChart>
      </section>

      <section className="grid grid-cols-2 text-subtitle">
        <div className="space-y-4">
          <div>금일 티켓 처리 건수</div>
          <div>금일 긴급 티켓 건수</div>
          <div>금주 티켓 처리 건수</div>
        </div>

        <div className="text-right text-main2-3 space-y-4">
          <div>20건</div>
          <div>2건</div>
          <div>150건</div>
        </div>
      </section>
    </div>
  );
}
