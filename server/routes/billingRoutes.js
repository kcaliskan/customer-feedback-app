const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });

    // req.user comes from passport.js
    // https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/questions/3437698
    // https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/questions/5244870
    // since we are using Passport, and the user is signed in we have access to the user model through req.user. With this access to the user model, we also have access to model methods.
    req.user.credits += 5;
    const user = await req.user.save();
    //console.log(user);
    res.send(user);
  });
};
