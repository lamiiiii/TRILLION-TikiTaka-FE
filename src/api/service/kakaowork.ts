import axios from 'axios';

const kakaoWorkInstance = axios.create({
  baseURL: 'https://api.kakaowork.com',
});

// INTF-52: 카카오워크 사용자 조회
interface KakaoUserResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    display_name: string;
    emails: string[];
    // ... 기타 필드
  };
}

export async function getUserByEmail(token: string, email: string) {
  try {
    const {data} = await kakaoWorkInstance.get<KakaoUserResponse>('/v1/users.find_by_email', {
      headers: {Authorization: `Bearer ${token}`},
      params: {email},
    });
    return data.user;
  } catch (error) {
    console.error('사용자 조회 실패:', error);
    throw error;
  }
}

// INTF-52: 카카오워크 채팅방 생성
interface ConversationResponse {
  success: boolean;
  conversation: {
    id: string;
    type: string;
    users_count: number;
  };
}

export async function openConversation(token: string, userId: string) {
  try {
    const {data} = await kakaoWorkInstance.post<ConversationResponse>(
      '/v1/conversations.open',
      {user_id: userId},
      {headers: {Authorization: `Bearer ${token}`}}
    );
    return data.conversation;
  } catch (error) {
    console.error('채팅방 생성 실패:', error);
    throw error;
  }
}

// INTF-52: 카카오워크 알림 전송
interface MessageBlock {
  type: string;
  text?: string;
  blocks?: any[];
}

interface SendMessageParams {
  conversation_id: string;
  blocks: MessageBlock[];
}

export async function sendNotification(token: string, conversationId: string, messageBlocks: MessageBlock[]) {
  try {
    const {data} = await kakaoWorkInstance.post(
      '/v1/messages.send',
      {
        conversation_id: conversationId,
        blocks: messageBlocks,
      },
      {headers: {Authorization: `Bearer ${token}`}}
    );
    return data;
  } catch (error) {
    console.error('알림 전송 실패:', error);
    throw error;
  }
}
