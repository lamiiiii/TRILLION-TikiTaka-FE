// 임시 로그 데이터 생성
const logData = [
  {
    action: '담당자 변경',
    details: 'Yeon -> Jojo',
    date: '2025.02.06',
  },
  {
    action: '상태 변경',
    details: 'Open -> In Progress',
    date: '2025.02.05',
  },
  {
    action: '우선순위 변경',
    details: 'Low -> High',
    date: '2025.02.04',
  },
  {
    action: '우선순위 변경',
    details: 'Low -> High',
    date: '2025.02.04',
  },
  {
    action: '우선순위 변경',
    details: 'Low -> High',
    date: '2025.02.04',
  },
  {
    action: '우선순위 변경',
    details: 'Low -> High',
    date: '2025.02.04',
  },
];

export default function TicketLog() {
  return (
    <div className="flex flex-col gap-1 ">
      <label className="text-body-bold">Log</label>
      <div className="w-full p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15 h-[300px] max-h-[300px] overflow-y-scroll">
        {logData.map((log, index) => (
          <div key={index} className="bg-main text-white rounded-md p-5 my-2 flex flex-col">
            <p className="text-body-regular">{log.action}</p>
            <p className="text-body-bold">{log.details}</p>
            <p className="text-caption-regular text-right mt-1">{log.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
