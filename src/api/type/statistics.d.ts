declare interface WeeklyStatsResponse {
  weekCreatedTickets: number;
  weekCompletedTickets: number;
  weekInProgressTickets: number;
  averageCompletionTime: number;
  completionRatio: number;
  lastUpdatedAt: string;
}

declare interface DailyCreationStatsResponse {
  dayCreatedTickets: number;
  dayFirstCategoryTickets: number;
  daySecondCategoryTickets: number;
  averageCompletionTime: number;
  completionRatio: number;
  lastUpdatedAt: string;
}

declare interface DailyHandledStatsResponse {
  dayCompletedTickets: number;
  dayInProgressTickets: number;
  averageCompletionTime: number;
  completionRatio: number;
  lastUpdatedAt: string;
}

declare interface MonthlyHandlingStatsResponse {
  monthCompletedTickets: number;
  monthInProgressTickets: number;
  averageCompletionTime: number;
  completionRatio: number;
  lastUpdatedAt: string;
}

declare interface WeeklyTicketSummaryResponse {
  weeklyTicketCounts: {
    Mon: number;
    Tue: number;
    Wed: number;
    Thu: number;
    Fri: number;
    Sat: number;
    Sun: number;
  };
  dayTickets: number;
  dayUrgentTickets: number;
  weekTickets: number;
}

// 응답 데이터 타입을 위한 interface
declare interface DailyTicketSummary {
  createdTickets: number;
  inProgressTickets: number;
  doneTickets: number;
}

// API 응답 전체 구조를 위한 interface
declare interface DailyTicketSummaryResponse {
  message: string;
  data: DailyTicketSummary;
}

// 담당자별 티켓 처리 현황 타입
declare interface ManagerTicketSummary {
  userName: string;
  userId: number;
  userEmail: string;
  userProfile: string;
  doneTickets: number;
  inProgressTickets: number;
}

// API 응답 타입
declare interface DailyManagerTicketSummaryResponse {
  message: string;
  data: ManagerTicketSummary[];
}

declare interface SecondCategory {
  secondCategoryId: number;
  secondCategoryName: string;
  ticketCount: number;
}

declare interface FirstCategory {
  firstCategoryId: number;
  firstCategoryName: string;
  secondCategories: SecondCategory[];
  totalTicketCount: number;
}

declare interface DailyCategorySummary {
  message: string;
  data: FirstCategory[];
}
