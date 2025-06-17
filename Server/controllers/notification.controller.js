import Notification from '../models/notification.model.js';
import User from '../models/user.model.js';

export const getNotificationsForUser = async (req, res) => {
  try {
    const userId = req.query.userId;

    const user = await User.findById(userId);
    if (!user || !user.projectId) return res.status(404).json({ message: "User or project not found" });

    const notifications = await Notification.find({ projectId: user.projectId }).sort({ createdAt: -1 }).lean();

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
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
