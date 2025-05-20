const express = require('express')
const {handleGenerateNewShortUrl} = require('../controller/url.js')
const {handleGetAllAnalytics} = require('../controller/admin.js')
const router = express.Router() 

router.post('/',handleGenerateNewShortUrl) 


router.get('/analytics',  handleGetAllAnalytics);


module.exports = router;