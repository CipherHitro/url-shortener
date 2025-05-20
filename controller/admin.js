const URL = require("../models/url");
const User = require("../models/user");

async function handleGetAllAnalytics(req, res) {
  if(!req.user){
    return res.redirect('/login');
  }
  const result = await URL.find({})
  const createdBy = await User.find({createdBy: result.createdBy});
  console.log("Created By", createdBy);
  return res.json({urls : result, name: createdBy});
}

module.exports = {
  handleGetAllAnalytics,
};