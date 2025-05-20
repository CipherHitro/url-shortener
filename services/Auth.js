const jwt = require("jsonwebtoken");
const secret = "$Rohit@29@11";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    },
    secret
  );
}
function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token , secret)
        
    } catch (error) {
        return null;
    }

}
module.exports = {
  setUser,
  getUser,
};
