import { getReceiverSocketId, io } from "../../socket/socket-io";
import Notification from "../notification/notification.model";
import User from "../user/user.model";

// ** Send friend request
export const sendRequest = async (senderId: string, receiverId: string) => {
  if (senderId === receiverId)
    throw new Error("Cannot send request to yourself");

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  if (!sender || !receiver) throw new Error("User not found");

  if (
    sender.friends.includes(receiverId) ||
    sender.friendRequests.includes(receiverId) ||
    sender.sentRequests.includes(receiverId) ||
    receiver.sentRequests.includes(senderId) ||
    receiver.friendRequests.includes(senderId)
  ) {
    throw new Error("Friend request already exists");
  }

  sender.sentRequests.push(receiverId);
  receiver.friendRequests.push(senderId);

  const updatedSender = await sender.save();
  const updatedReceiver = await receiver.save();

  // ✅ 1. Create a persistent notification
  const notification = await Notification.create({
    senderId,
    receiverId,
    type: "friend_request",
    name: sender.name,
    message: `${sender.name} sent you a friend request.`,
    avatar: sender.avatar,
  });

  // ✅ 2. If receiver online, send real-time notification
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("friend_request_received", {
      senderId,
      senderName: sender.name,
      message: notification.message,
      notificationId: notification._id,
      createdAt: notification.createdAt,
    });
  }

  return {
    message: "Friend request sent",
    data: { sender: updatedSender, receiver: updatedReceiver },
  };
};

// ** Get sent friend requests
export const getSentRequests = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Populate the sent requests with user details
  const populatedUser = await User.findById(userId).populate(
    "sentRequests",
    "name email avatar"
  );

  return {
    message: "Sent friend requests retrieved successfully",
    sentRequests: populatedUser?.sentRequests || [],
  };
};

// ** Get all non-friend users
export const getNonFriendUsers = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Get all users except:
  // 1. The current user
  // 2. Users who are already friends
  // 3. Users who have sent friend requests to this user
  // 4. Users to whom this user has sent friend requests
  const nonFriendUsers = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: user.friends } },
      { _id: { $nin: user.friendRequests } },
      { _id: { $nin: user.sentRequests } },
    ],
  }).select("name email avatar");

  return {
    message: "Non-friend users retrieved successfully",
    nonFriendUsers,
  };
};

// ** Cancel friend request
export const cancelRequest = async (senderId: string, receiverId: string) => {
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  if (!sender || !receiver) throw new Error("User not found");

  // Remove the receiverId from sender's sentRequests
  sender.sentRequests = sender.sentRequests.filter(
    (id: string) => id.toString() !== receiverId
  );

  // Remove the senderId from receiver's friendRequests
  receiver.friendRequests = receiver.friendRequests.filter(
    (id: string) => id.toString() !== senderId
  );

  await sender.save();
  await receiver.save();

  // Delete any related notification
  await Notification.deleteOne({
    senderId,
    receiverId,
    type: "friend_request",
  });

  return { message: "Friend request cancelled successfully" };
};

// ** Accept friend request
// export const acceptRequest = async (
//   userId: string,
//   requesterId: string
// ) => {
//   const user = await User.findById(userId);
//   const requester = await User.findById(requesterId);

//   if (!user || !requester) throw new Error("User not found");

//   user.friendRequests = user.friendRequests.filter(
//     (id) => id.toString() !== requesterId
//   );
//   requester.sentRequests = requester.sentRequests.filter(
//     (id) => id.toString() !== userId
//   );

//   user.friends.push(requesterId);
//   requester.friends.push(userId);

//   await user.save();
//   await requester.save();

//   return { message: "Friend request accepted" };
// };

// // ** Reject friend request
// export const rejectRequest = async (
//   userId: string,
//   requesterId: string
// ) => {
//   const user = await User.findById(userId);
//   const requester = await User.findById(requesterId);

//   if (!user || !requester) throw new Error("User not found");

//   user.friendRequests = user.friendRequests.filter(
//     (id) => id.toString() !== requesterId
//   );
//   requester.sentRequests = requester.sentRequests.filter(
//     (id) => id.toString() !== userId
//   );

//   await user.save();
//   await requester.save();

//   return { message: "Friend request rejected" };
// };
