export interface INotification {
  senderId: string;
  receiverId: string;
  name: string;
  avatar: string;
  type: "friend_request" | "message" | "system";
  message: string;
  isRead: boolean;
  createdAt: Date;
}
