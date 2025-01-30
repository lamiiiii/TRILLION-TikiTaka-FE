import TicketSmall from './TicketSmall';

export default function TicketPersonalManageList() {
  return (
    <div>
      <div className="flex items-center w-full h-15 bg-gray-1 border border-gray-2 rounded py-4 px-[30px] mb-6">
        <h1 className="text-title-bold">나의 티켓 관리</h1>
      </div>

      <div className="w-full bg-gray-18 grid grid-cols-3 gap-x-2 py-5 px-9">
        <section className="flex flex-col gap-2 py-[26px] px-4 rounded border border-gray-2">
          <div className="flex items-center gap-3">
            <div className="w-[8px] h-[8px] rounded-full bg-orange"></div>
            <h1 className="text-subtitle">대기</h1>
          </div>
          <TicketSmall id={112} title="[생성] 마이크로서비스 기반의 애플리케이션 컨테이너화" deadline="2023-06-30" initialStatus="대기" />
        </section>

        <section className="flex flex-col gap-2 py-[26px] px-4 rounded border border-gray-2">
          <div className="flex items-center gap-3">
            <div className="w-[8px] h-[8px] rounded-full bg-green"></div>
            <h1 className="text-subtitle">진행</h1>
          </div>
          <TicketSmall id={114} title="[생성] 마이크로서비스 기반의 애플리케이션 컨테이너화" deadline="2023-06-30" initialStatus="진행중" />
        </section>

        <section className="flex flex-col gap-2 py-[26px] px-4 rounded border border-gray-2">
          <div className="flex items-center gap-3">
            <div className="w-[8px] h-[8px] rounded-full bg-yellow"></div>
            <h1 className="text-subtitle">완료</h1>
          </div>
          <TicketSmall id={115} title="[생성] 마이크로서비스 기반의 애플리케이션 컨테이너화" deadline="2023-06-30" initialStatus="완료" />
        </section>
      </div>
    </div>
  );
}
