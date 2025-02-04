import {useState} from 'react';
import {Bar, BarChart, LabelList, XAxis, PieChart, Pie, Cell} from 'recharts';

// 임시 데이터 - 1차 카테고리
const primaryData = [
  {name: '인프라', ticket: 100},
  {name: '네트워크', ticket: 30},
  {name: '시스템', ticket: 50},
  {name: '공통 플랫폼', ticket: 60},
];

// 임시 데이터 - 2차 카테고리
const secondaryData = {
  인프라: [
    {name: '서버', value: 40},
    {name: '스토리지', value: 30},
    {name: '클라우드', value: 30},
  ],
  네트워크: [
    {name: '보안', value: 50},
    {name: '라우팅', value: 30},
    {name: '모니터링', value: 20},
  ],
  시스템: [
    {name: 'OS', value: 60},
    {name: '미들웨어', value: 25},
    {name: '배포', value: 15},
  ],
  '공통 플랫폼': [
    {name: 'DB', value: 45},
    {name: '인증', value: 35},
    {name: '로그', value: 20},
  ],
};

const COLORS = ['#F6D47A', '#FFB74D', '#FFD700']; // 색상 팔레트

export default function CategoryTicketStatus() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-full h-[500px] bg-gray-18 p-5">
      <div className="flex items-center gap-4">
        <h1 className="text-title-bold">카테고리별 티켓 생성 현황</h1>
        <div className="bg-gray-1 border border-gray-2 rounded-full py-1 px-4 text-body-bold w-fit">
          1차 카테고리 Bar 클릭 시 2차 카테고리 데이터를 확인 가능합니다.
        </div>
      </div>
      <div className="flex flex-col bg-white rounded border border-gray-2 p-10 mt-4">
        <div className="flex items-start gap-10 w-full bg-gray-18 p-5">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center text-subtitle bg-main text-white rounded-full px-3 py-2 w-fit">
              1차 카테고리
            </div>
            <section>
              {/* 1차 카테고리 Bar 차트 */}
              <BarChart width={200} height={300} data={primaryData}>
                <XAxis
                  dataKey="name"
                  tick={{fontSize: 12}}
                  axisLine={false}
                  tickLine={false}
                  angle={-30} // 틱 텍스트 회전 각도
                  height={60}
                  textAnchor="end" // 텍스트 정렬 방식
                  tickFormatter={(tick: string) => tick} // 문자열 반환 함수
                />

                <Bar
                  dataKey="ticket"
                  fill="#F6D47A"
                  radius={100}
                  onMouseEnter={(_, index) => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={(data) => setSelectedCategory(data.name)}
                >
                  {primaryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        hoverIndex === index || selectedCategory === primaryData[index].name
                          ? '#D4A946' // 호버/선택 시 더 진한 색상
                          : '#F6D47A'
                      }
                    />
                  ))}
                  <LabelList dataKey="ticket" position="center" fill="#FFFFFF" fontSize={10} />
                </Bar>
              </BarChart>
            </section>
          </div>

          {/* 2차 카테고리 파이 차트 */}
          {selectedCategory && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-center text-subtitle bg-main text-white rounded-full px-3 py-2 w-fit">
                2차 카테고리
              </div>
              <section className="ml-10 grid grid-cols-2 text-subtitle">
                <div className="flex flex-col items-center gap-4">
                  <PieChart width={200} height={200}>
                    <Pie
                      data={secondaryData[selectedCategory as keyof typeof secondaryData]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={30}
                      dataKey="value"
                    >
                      {secondaryData[selectedCategory as keyof typeof secondaryData].map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="text-main2-3 text-center">{selectedCategory} 세부 분류</div>
                </div>

                <div className="flex flex-col justify-center gap-3 ml-10">
                  {secondaryData[selectedCategory as keyof typeof secondaryData].map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}} />
                      <span>{item.name}</span>
                      <span className="ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
