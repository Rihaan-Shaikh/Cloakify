export type MessageType = 'PING' | 'PONG' | 'CHECK_STATUS';

export interface ExtensionMessage<T = unknown> {
  type: MessageType;
  payload?: T;
}

export interface StatusResponse {
  status: string;
  timestamp: number;
}
