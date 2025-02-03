import ManagerItem from './ManagerItem';

const managerData = [
  {
    name: 'Alex',
    email: 'alex@gmail.com',
    processing: 1000,
    completed: 1000,
    duration: '12hour',
  },
  {
    name: 'Jojo',
    email: 'jamie@gmail.com',
    processing: 500,
    completed: 800,
    duration: '12hour',
  },
  {
    name: 'Hoho',
    email: 'jamie@gmail.com',
    processing: 500,
    completed: 800,
    duration: '12hour',
  },
];
export default function ManagerTicketStatus() {
  return (
    <div className="flex flex-col w-full h-full bg-gray-18 p-5">
      <h1 className="text-title-bold">담당자별 티켓 처리 현황</h1>
      <div className="flex items-center gap-6 bg-white rounded border border-gray-2 p-10 mt-4">
        {managerData.map((manager, index) => (
          <ManagerItem key={index} {...manager} />
        ))}
      </div>
    </div>
  );
}
