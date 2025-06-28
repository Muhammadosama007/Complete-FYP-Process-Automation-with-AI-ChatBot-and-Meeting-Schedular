const sessions = {};
const MAX_HISTORY = 20;

export const getSessionHistory = (userId) => {
  if (!sessions[userId]) sessions[userId] = [];
  return sessions[userId];
};

export const addToSession = (userId, message) => {
  if (!sessions[userId]) sessions[userId] = [];
  sessions[userId].push(message);
  if (sessions[userId].length > MAX_HISTORY) {
    sessions[userId].shift();
  }
};

export const clearSession = (userId) => {
  delete sessions[userId];
};
