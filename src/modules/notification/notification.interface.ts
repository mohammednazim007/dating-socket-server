export interface INotification {
  senderId: string;
  receiverId: string;
  type: "friend_request" | "message" | "system";
  message: string;
  isRead: boolean;
  createdAt: Date;
}
