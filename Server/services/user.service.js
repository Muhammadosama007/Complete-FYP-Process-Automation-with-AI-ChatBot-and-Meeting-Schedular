import User from '../models/user.model.js';


// export const findOrCreateUserByGoogle = async (googleProfile) => {
//   const { googleId, name, email, image } = googleProfile;

//   let user = await User.findOne({ googleId });
//   if (!user) {
//     let role = 'student';
//     if (['tanveer.166666@gmail.com', 'Ahmedali.1128844@gmail.com', 'jabbarakbar419@gmail.com'].includes(email)) {
//       role = 'advisor';
//     } else if (['qasimali.po001@gmail.com', 'usmanpo777@gmail.com'].includes(email)) {
//       role = 'po';
//     }
//     user = await User.create({
//       googleId,
//       name,
//       email,
//       image,
//       role,
//     });
//   }

//   return user;
// };
export const findOrCreateUserByGoogle = async (googleProfile) => {
  const { googleId, name, email, image } = googleProfile;

  let user = await User.findOne({ googleId });
  if (!user) {
    let role = 'student';
    let faculty = null;
    let projectStanding = null;
    let creditHours = null;
    let gpa = null;
    let cgpa = null;
    let advisorProjects = null;

    if (['tanveer.166666@gmail.com', 'Ahmedali.1128844@gmail.com', 'jabbarakbar419@gmail.com'].includes(email)) {
      role = 'advisor';
      faculty = 'Software Engineering';
      advisorProjects = {
        maxCapacity: 5,
        active: 3,
        completed: 2,
      };
    } else if (['qasimali.po001@gmail.com', 'usmanpo777@gmail.com'].includes(email)) {
      role = 'po';
    } else {
      role = 'student';
      faculty = 'Software Engineering';
      projectStanding = 75; // 75% completed
      creditHours = 95;
      gpa = 3.5;
      cgpa = 3.4;
    }

    user = await User.create({
      googleId,
      name,
      email,
      image,
      role,
      faculty,
      projectStanding,
      creditHours,
      gpa,
      cgpa,
      advisorProjects,
    });
  }

  return user;
};


export const getAllUsers = async () => {
  return await User.find();
};
