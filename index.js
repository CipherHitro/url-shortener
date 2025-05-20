const express = require("express");
const urlRoute = require('./routes/url')
const userRoute = require('./routes/user')
const { connectMongoDb } = require("./connections");
const URL = require('./models/url.js')
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUser, checkAuth} = require('./middlewares/auth.js')


const app = express();
const PORT = 8001;

//Settings EJS 
app.set('view engine', 'ejs')

//Middlewares 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public")); 


//Connections
connectMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDb connected!"))
  .catch((err) => console.log(err)
);

app.get('/', checkAuth, (req, res) => {
  res.render('index');
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login", (req, res) => {
  res.render("login");
});
//Routes 
app.use('/url', restrictToLoggedinUser, urlRoute);
app.use('/user', userRoute);

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
