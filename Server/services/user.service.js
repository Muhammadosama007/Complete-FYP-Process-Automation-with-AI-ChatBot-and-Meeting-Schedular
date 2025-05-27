import User from '../models/user.model.js';


export const findOrCreateUserByGoogle = async (googleProfile) => {
  const { googleId, name, email, image } = googleProfile;

  let user = await User.findOne({ googleId });
  if (!user) {
    let role = 'student';
    if (['tanveer.166666@gmail.com', 'Ahmedali.1128844@gmail.com', 'jabbarakbar419@gmail.com'].includes(email)) {
      role = 'advisor';
    } else if (['qasimali.po001@gmail.com', 'usmanpo777@gmail.com'].includes(email)) {
      role = 'po';
    }
    user = await User.create({
      googleId,
      name,
      email,
      image,
      role,
    });
  }

  return user;
};


export const getAllUsers = async () => {
  return await User.find();
};
