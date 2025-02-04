import instance from '../axiosInstance';

interface ChangeHistoryItem {
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

export async function getChangeHistory(token: string, ticketId: number): Promise<ChangeHistoryItem[]> {
  try {
    const {data} = await instance.get<{message: string; data: ChangeHistoryItem[]}>(`/histories/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error('변경 이력 조회 실패:', error);
    throw error;
  }
}
