const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  //We add the idea to survey schema that every survey is going to belong to a very particular user.

  //First off indicate that it has a type of schema type object ID. So whenever this record whenever a schema actually gets saved to our database if we look up this user property we'll see an ID for assigned to this field right here and it will be the ID of the user who owns this record.

  //Now notice we also add in reference here of user like so. So this tells mongoose that the reference that we're making this too belongs to the user's collection.

  //By convention we might make use of underscore user like this to make it obvious to anyone who's looking at this that this is supposed to be a relationship field or it's supposed to set up a relationship between this model and then and another one.

  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
