export interface Category {
  id: number;
  firstId?: number; // 1차 카테고리 아이디 (있으면)
  name: string;
}

export interface Template {
  id: number;
  name: string;
  firstCategory?: string;
  secondCategory?: string;
  manager?: string;
  type?: string;
  title?: string;
  content?: string;
  createdAt: string;
  // 첨부파일
}
