import Notification from '../models/notification.model.js';
import User from '../models/user.model.js';


export const getNotificationsForUser = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const notifications = await Notification.find({
      $or: [
        { receiverId: userId }, // direct notifications
        { projectId: user.projectId } // project-based group notifications
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const markAllNotificationsAsSeen = async (req, res) => {
  try {
    const userId = req.body.userId;

    await Notification.updateMany(
      { seenBy: { $ne: userId } },
      { $addToSet: { seenBy: userId } }
    );

    res.status(200).json({ message: "Marked all as seen" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notifications", error });
  }
};
