const agents = [
    { name: "Alex", email: "alex@gmail.com", inProgress: 10, completed: 5, avgTime: "1시간" },
    { name: "John", email: "john@gmail.com", inProgress: 8, completed: 7, avgTime: "2시간" },
    { name: "Lisa", email: "lisa@gmail.com", inProgress: 12, completed: 3, avgTime: "30분" },
  ];
  
  export default function AgentTicketStats() {
    return (
      <div>
        <h2 className="text-lg font-bold mb-4">담당자별 티켓 처리 현황</h2>
        <div className="flex gap-4 overflow-x-auto">
          {agents.map((agent, index) => (
            <div key={index} className="bg-gray-900 text-white p-4 rounded-lg w-[220px]">
              <h3 className="text-lg font-semibold">{agent.name}</h3>
              <p className="text-sm">{agent.email}</p>
              <div className="mt-2">
                <p>처리 중: {agent.inProgress}</p>
                <p>처리 완료: {agent.completed}</p>
                <p>평균 처리 시간: {agent.avgTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  