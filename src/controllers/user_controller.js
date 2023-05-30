// placeholder - depends on how the google calendar API works
import User from '../models/user_model';

// eslint-disable-next-line import/prefer-default-export
export async function createUser(userFields) {
  // all these can be got from the google calendar API
  const user = new User();
  user.email = userFields.email;
  user.events = userFields.events;
  try {
    const savedUser = await user.save();
    return savedUser; // return user
  } catch (error) {
    throw new Error(`create user error: ${error}`);
  }
}

export async function getUserEvents(id) {
  try {
    const user = await User.findById(id);
    return user.events;
  } catch (error) {
    throw new Error(`get user events error: ${error}`);
  }
}

export async function getUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`get users error: ${error}`);
  }
}
