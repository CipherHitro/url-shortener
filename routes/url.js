const express = require('express')
const {handleGenerateNewShortUrl, handleGetAnalytics} = require('../controller/url.js')
const router = express.Router() 

router.post('/',handleGenerateNewShortUrl) 

router.get('/analytics/:shortid', handleGetAnalytics);
module.exports = router;