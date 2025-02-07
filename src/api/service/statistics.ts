import instance from '../axiosInstance';

// 요일별 티켓 조회 (INTF-52)
export async function getWeeklyTicketSummary(managerId: number) {
  try {
    const {data} = await instance.get<{
      message: string;
      data: WeeklyTicketSummaryResponse;
    }>(`/statistics/weekly/summary?managerId=${managerId}`);
    return data.data;
  } catch (error) {
    console.error('요일별 티켓 조회 실패:', error);
    throw error;
  }
}

// INTF-52: 일간 카테고리별 티켓 생성 현황
export async function getDailyCategorySummary(): Promise<FirstCategory[]> {
  try {
    const {data} = await instance.get<DailyCategorySummary>('/statistics/daily/catSummary');
    return data.data;
  } catch (error) {
    console.error('일간 카테고리별 티켓 생성 현황 조회 실패:', error);
    throw error;
  }
}

// INTF-52: 월간 카테고리별 티켓 생성 현황
export async function getMonthlyCategorySummary(year: number, month: number): Promise<FirstCategory[]> {
  try {
    const {data} = await instance.get<MonthlyCategorySummaryResponse>(`/statistic/monCategory?year=${year}&month=${month}`);
    return data.data;
  } catch (error) {
    console.error('월간 카테고리별 티켓 생성 현황 조회 실패:', error);
    throw error;
  }
}

// INTF-69: 일간 담당자별 티켓 처리 현황
export async function getDailyManagerTicketSummary(): Promise<ManagerTicketSummary[]> {
  try {
    const {data} = await instance.get<DailyManagerTicketSummaryResponse>('/statistics/daily/manSummary');
    return data.data;
  } catch (error) {
    console.error('일간 담당자별 티켓 처리 현황 조회 실패:', error);
    throw error;
  }
}

// INTF-69: 월간 담당자별 티켓 처리 현황
export async function getMonthlyManagerTicketSummary(year: number, month: number): Promise<MonthlyManagerTicketSummary[]> {
  try {
    const {data} = await instance.get<MonthlyManagerTicketSummaryResponse>(`/statistic/monUser?year=${year}&month=${month}`);
    return data.data;
  } catch (error) {
    console.error('월간 담당자별 티켓 처리 현황 조회 실패:', error);
    throw error;
  }
}

// INTF-70: 일간 티켓 처리 현황
export async function getDailyTicketSummary(): Promise<DailyTicketSummary> {
  try {
    const {data} = await instance.get('/statistics/daily/summary');
    return data.data;
  } catch (error) {
    console.error('일간 티켓 처리 현황 조회 실패:', error);
    throw error;
  }
}
// INTF-70: 월간 티켓 처리 현황
// 금월 처리된 티켓의 전체 생성 수, 전체 진행중인 티켓 수, 전체 완료된 티켓 수
export async function getMonthlyTicketSummary(year: number, month: number): Promise<MonthlyTicketSummary> {
  try {
    const {data} = await instance.get<MonthlyTicketSummaryResponse>(`/statistic/monAll?year=${year}&month=${month}`);
    return data.data;
  } catch (error) {
    console.error('월간 티켓 처리 현황 조회 실패:', error);
    throw error;
  }
}
