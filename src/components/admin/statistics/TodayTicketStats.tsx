import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// ✅ Chart.js 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TodayTicketStats() {
  const data = {
    labels: ["생성", "처리 중", "완료"],
    datasets: [
      {
        data: [35, 40, 25], // 예제 데이터
        backgroundColor: ["#FFD700", "#FFB347", "#E6A23C"],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">금일 티켓 처리 현황</h2>
      <Doughnut data={data}  width={150} height={150} />
    </div>
  );
}
