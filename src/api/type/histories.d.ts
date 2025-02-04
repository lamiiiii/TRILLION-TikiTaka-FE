declare interface ChangeHistoryItem {
  historyId: number;
  ticketId: number;
  fieldName: string;
  originalValue: string;
  updatedValue: string;
  updatedBy: number;
  updatedByName: string;
  createdAt: string;
  updatedAt: string;
}
