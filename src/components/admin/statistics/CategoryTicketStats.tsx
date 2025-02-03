import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

// ✅ Chart.js 요소 등록
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function CategoryTicketStats() {
  const barData = {
    labels: ["Infra", "Software", "Security", "HR", "Finance"],
    datasets: [
      {
        label: "생성된 티켓 수",
        data: [60, 40, 30, 50, 20],
        backgroundColor: "#FFD700",
      },
    ],
  };

  const doughnutData = {
    labels: ["Infra", "Software", "Security"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#FFD700", "#FFB347", "#E6A23C"],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">카테고리별 티켓 생성 현황</h2>
      <div className="grid grid-cols-3 gap-4">
  <div className="w-full p-3 bg-white rounded-lg shadow">
    <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} width={150} height={150} />
  </div>
  <div className="w-full p-3 bg-white rounded-lg shadow">
    <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} width={150} height={150} />
  </div>
</div>

    </div>
  );
}
