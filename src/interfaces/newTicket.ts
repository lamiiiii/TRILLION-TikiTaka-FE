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
