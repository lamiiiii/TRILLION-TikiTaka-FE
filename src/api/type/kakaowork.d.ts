declare interface KakaoUserResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    display_name: string;
    emails: string[];
    // ... 기타 필드
  };
}

declare interface ConversationResponse {
  success: boolean;
  conversation: {
    id: string;
    type: string;
    users_count: number;
  };
}

declare interface MessageBlock {
  type: string;
  text?: string;
  blocks?: any[];
}

declare interface SendMessageParams {
  conversation_id: string;
  blocks: MessageBlock[];
}
