const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateNewShortUrl(req, res) {
  const shortId = shortid.generate();
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ message: "URL is required" });
  }
  const result = await URL.findOne({ redirectUrl : body.url });
  if(result){

    return res.status(200).json({ id: result.shortId });
  }
  else{
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
      });
      return res.status(201).json({ id: shortId });
    }
}
async function handleGetAnalytics(req, res) {
  const shortid = req.params.shortid;
  console.log(shortid)

  const result = await URL.findOne({ shortId : shortid });
    console.log(result)
  return res.json({
    totalClicks: result.visitHistory.length,
    visitHistory: result.visitHistory,
  });
}
module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
};
