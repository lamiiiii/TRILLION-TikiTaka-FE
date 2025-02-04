import instance from "../axiosInstance";

// 주간 통계 조회 (INTF-66)
interface WeeklyStatsResponse {
    weekCreatedTickets: number;
    weekCompletedTickets: number;
    weekInProgressTickets: number;
    averageCompletionTime: number;
    completionRatio: number;
    lastUpdatedAt: string;
  }
  
  export async function getWeeklyTicketStats(token: string) {
    try {
      const { data } = await instance.get<{ message: string; data: WeeklyStatsResponse }>(
        '/statistics/week',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data.data;
    } catch (error) {
      console.error('주간 통계 조회 실패:', error);
      throw error;
    }
  }
  
  // 일일 생성 현황 (INTF-52)
  interface DailyCreationStatsResponse {
    dayCreatedTickets: number;
    dayFirstCategoryTickets: number;
    daySecondCategoryTickets: number;
    averageCompletionTime: number;
    completionRatio: number;
    lastUpdatedAt: string;
  }
  
  export async function getDailyCreationStats(token: string) {
    try {
      const { data } = await instance.get<{ message: string; data: DailyCreationStatsResponse }>(
        '/statistics/day/creation',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data.data;
    } catch (error) {
      console.error('일일 생성 현황 조회 실패:', error);
      throw error;
    }
  }
  
  // 일일 처리 현황 (INTF-52)
  interface DailyHandledStatsResponse {
    dayCompletedTickets: number;
    dayInProgressTickets: number;
    averageCompletionTime: number;
    completionRatio: number;
    lastUpdatedAt: string;
  }
  
  export async function getDailyHandledStats(token: string) {
    try {
      const { data } = await instance.get<{ message: string; data: DailyHandledStatsResponse }>(
        '/statistics/day/handled',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data.data;
    } catch (error) {
      console.error('일일 처리 현황 조회 실패:', error);
      throw error;
    }
  }
  
  // 월간 처리 현황 (INTF-52)
  interface MonthlyHandlingStatsResponse {
    monthCompletedTickets: number;
    monthInProgressTickets: number;
    averageCompletionTime: number;
    completionRatio: number;
    lastUpdatedAt: string;
  }
  
  export async function getMonthlyHandlingStats(token: string) {
    try {
      const { data } = await instance.get<{ message: string; data: MonthlyHandlingStatsResponse }>(
        '/statistics/monthly/handled',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data.data;
    } catch (error) {
      console.error('월간 처리 현황 조회 실패:', error);
      throw error;
    }
  }
  
  // 월간 생성 현황 (INTF-52)
  interface MonthlyCreationStatsResponse {
    monthCreatedTickets: number;
    mon
  