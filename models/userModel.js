import { nanoid } from 'nanoid';
import { userDB, notesDB } from '../databases/database.js';
import { comparePasswords } from '../bcrypt.js';

async function usernameExists(username) {
  const usernames = await userDB.findOne({ username });
  if (usernames) {
    return true;
  }
  return false;
}

async function getUserData(userId) {
  const userData = await userDB.findOne({ userId });
  
  if (!userData) {
    return { success: false };
  } else {
    return userData;
  }
}

async function createUser(username, password) {
  const userId = nanoid();
  await userDB.insert({ username, password, userId });
  return userId;
}

async function userIdExists(userId) {
  return userDB.findOne({ userId });
}

async function authenticateLogin(username, password) {
  const userExists = await userDB.findOne({ username });

  if (userExists) {
    const hashedPassword = userExists.password;

    const authUser = await comparePasswords(password, hashedPassword);

    if (authUser) {
      return { success: true, userId: userExists.userId, message: 'Login successful.' };
    }
  }

  return { success: false, message: 'Wrong username or password' };
}

export { usernameExists, getUserData, createUser, userIdExists, authenticateLogin };