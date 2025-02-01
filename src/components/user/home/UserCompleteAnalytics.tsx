import {Cell, Pie, PieChart, ResponsiveContainer} from 'recharts';

// 임시 데이터 - 당일 완료 티켓 건수
const data = [
  {name: '미완료', ticket: 100},
  {name: '완료', ticket: 30},
];

const COLORS = ['#F0C000', '#FFDF5F'];

export default function UserCompleteAnalytics() {
  return (
    <div className="flex items-center gap-6 w-full bg-gray-18 p-5">
      <section className="w-[200px] h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="ticket">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}-${entry}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </section>

      <section className="grid grid-cols-2 gap-3 text-subtitle">
        <div className="space-y-4">
          <div>미완료</div>
          <div>완료</div>
        </div>

        <div className="text-right text-main2-3 space-y-4">
          <div>100건</div>
          <div>30건</div>
        </div>
      </section>
    </div>
  );
}
