import instance from '../axiosInstance';

// INTF-48: 파일 업로드 URL 발급
interface PresignedUrlRequest {
  fileName: string;
  mimeType: string;
  fileSize: number;
}

interface PresignedUrlResponse {
  presignedUrl: string;
  expiresIn: number;
}

export async function getPresignedUrl(token: string, type: string, typeId: number, fileData: PresignedUrlRequest) {
  try {
    const {data} = await instance.post<{message: string; data: PresignedUrlResponse}>(`/attachments/${type}/${typeId}`, fileData, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('프리사인드 URL 발급 실패:', error);
    throw error;
  }
}

// INTF-49: 첨부파일 추가
interface AttachmentMetadata {
  fileName: string;
  filePath: string;
  mimeType: string;
  fileSize: number;
}

export async function addAttachmentMetadata(token: string, type: string, typeId: number, metadata: AttachmentMetadata) {
  try {
    const {data} = await instance.post(`/attachments/${type}/${typeId}`, metadata, {headers: {Authorization: `Bearer ${token}`}});
    return data;
  } catch (error) {
    console.error('첨부파일 메타데이터 추가 실패:', error);
    throw error;
  }
}

// INTF-49 (첨부파일 조회): 실제 인터페이스 번호 중복 주의
interface AttachmentItem {
  attachmentId: number;
  type: string;
  typeId: number;
  fileName: string;
  fileSize: number;
}

export async function getAttachments(token: string, type: string, typeId: number) {
  try {
    const {data} = await instance.get<{message: string; data: AttachmentItem[]}>(`/attachments/${type}/${typeId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('첨부파일 조회 실패:', error);
    throw error;
  }
}

// INTF-50: 첨부파일 삭제
export async function deleteAttachment(token: string, type: string, typeId: number) {
  try {
    const {data} = await instance.delete(`/attachments/${type}/${typeId}`, {headers: {Authorization: `Bearer ${token}`}});
    return data;
  } catch (error) {
    console.error('첨부파일 삭제 실패:', error);
    throw error;
  }
}
