const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateNewShortUrl(req, res) {
  const shortId = shortid.generate();
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ message: "URL is required" });
  }
  const result = await URL.findOne({ redirectUrl: body.url });
  let urls = await URL.find({});

  if (result) {
    return res.status(200).json({ id: result.shortId ,urls});
  } else {
    await URL.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: [],
      createdBy : req.user._id
    });
    let urls = await URL.find({});

    return res.status(201).json({ id: shortId ,urls});
  }
}
async function handleGetAnalytics(req, res) {
  if(!req.user){
    return res.redirect('/login');
  }
  const result = await URL.find({createdBy : req.user._id})
  return res.json({urls : result , name: null});
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
};
