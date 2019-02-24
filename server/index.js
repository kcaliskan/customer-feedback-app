const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//require("./client/src/setupProxy")(app);
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //So when a request comes into express express we'll first check to see if there is some specific file that matches up with what that request is looking for. If there is it's going to answer the request with this line right here if there's not express will then continue on down and we'll find this next route handler which we can essentially think of as the absolute catchall inside of our application.

  // Express will serve up production assets
  // like our main.js file, or main.css file!

  //So this first line right here says if any get request comes in for some routes or some file or absolutely anything to our application and we do not understand what it's looking for.
  //Like if we do not already have a route handler set up for this thing then look into the client/build directory and try to see if there's some file inside of there that matches up with what this request is looking for.

  //So in other words if someone comes looking for client/build/static/js/main.js look into client/build and see if there is a file at static/js/main and if there is go ahead and respond with that.
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route

  //Essentially this says if someone makes a request for a route that we do not understand just serve it up the HTML document.
  //If we don't know what this route is we will just assume that the react route or side of our application is responsible for this route. So we're just going to kick the user over to our client side application.
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
