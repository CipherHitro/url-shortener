const express = require("express");
const urlRoute = require('./routes/url')
const { connectMongoDb } = require("./connections");
const URL = require('./models/url.js')


const app = express();
const PORT = 8001;

//Settings EJS 
app.set('view engine', 'ejs')

//Middlewares 
// app.use(express.urlencoded({ extended: false }));


//Connections
connectMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDb connected!"))
  .catch((err) => console.log(err)
);

// Middlewares  
app.use(express.json())
app.use(express.static("public")); 

app.get('/', (req, res) => {
  res.render('index', {foo: 'FOO'});
});


//Routes 
app.use('/url', urlRoute);

app.get('/r/:shortid', async (req,res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    {
      shortId
    }, 
    {
      $push: {
        visitHistory : {
          timestamp: Date.now(),
        },
      }
    }
  )
  res.redirect(entry.redirectUrl)
})

app.listen(PORT, () => console.log(`Server is running on PORT :${PORT}`));
