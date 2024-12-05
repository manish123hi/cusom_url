const sessionIdToUserMap = new Map(); //hash map

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getuser(id) {
  return sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getuser,
};
