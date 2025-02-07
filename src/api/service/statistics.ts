import instance from '../axiosInstance';

// INTF-66: 주간 통계 조회
export async function getWeeklyTicketStats(token: string) {
  try {
    const {data} = await instance.get<{message: string; data: WeeklyStatsResponse}>('/statistics/week', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('주간 통계 조회 실패:', error);
    throw error;
  }
}

// INTF-52: 일일 생성 현황
export async function getDailyCreationStats(token: string) {
  try {
    const {data} = await instance.get<{message: string; data: DailyCreationStatsResponse}>('/statistics/day/creation', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('일일 생성 현황 조회 실패:', error);
    throw error;
  }
}

//FIX: 수정 필요
// 일일 처리 현황 (INTF-52)
export async function getDailyHandledStats(token: string) {
  try {
    const {data} = await instance.get<{message: string; data: DailyHandledStatsResponse}>('/statistics/day/handled', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('일일 처리 현황 조회 실패:', error);
    throw error;
  }
}

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

// 월간 처리 현황 (INTF-52)
export async function getMonthlyHandlingStats(token: string) {
  try {
    const {data} = await instance.get<{message: string; data: MonthlyHandlingStatsResponse}>('/statistics/monthly/handled', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('월간 처리 현황 조회 실패:', error);
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
