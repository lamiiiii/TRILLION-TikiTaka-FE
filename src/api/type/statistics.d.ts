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
