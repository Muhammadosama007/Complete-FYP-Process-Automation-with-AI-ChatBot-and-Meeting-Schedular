import User from '../models/user.model.js';


export const findOrCreateUserByGoogle = async (googleProfile) => {
  const { googleId, name, email, image } = googleProfile;

  let user = await User.findOne({ googleId });
  if (!user) {
    user = await User.create({
      googleId,
      name,
      email,
      image,
    });
  }

  return user;
};

export const getAllUsers = async () => {
  return await User.find();
};
