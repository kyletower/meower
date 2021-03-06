const express = require("express");
const cors = require("cors");
const monk = require("monk");
// const { response } = require("express");
const Filter = require("bad-words");
const rateLimit = require("express-rate-limit");

const app = express();

const db = monk(process.env.MONGO_URI || "localhost/meower"); // meower is the db name. Mongo works with collections (think arrays)
/** 
   [{
    name: ...,
    content: ...,
    _id: ...
}, {
    name: ...,
    content: ...,
    _id: ...
}]
**/
const mews = db.get("mews"); // this is now a collection, if db doesn't exist, this will create it, if the collection doesn't exist, this will create it

const filter = new Filter();

app.use(cors()); // adds cors as a middleware, all incoming requests passes through cors which adds the necessary headers to it.
app.use(express.json()); // json body parser, any incoming req with json content type will be parsed by this middleware and put on the body.

app.get("/", (reqest, response) => {
  response.json({
    message: "Meower! 🐈",
  });
});

app.get("/mews", (request, response) => {
  // query db
  mews.find().then((mews) => {
    response.json(mews);
  });
});

function isValidMew(mew) {
  return (
    mew.name &&
    mew.name.toString().trim() !== "" &&
    mew.content &&
    mew.content.toString().trim() !== ""
  );
}

// this will only limit posting mews since it's below this line!
app.use(
  rateLimit({
    windowMs: 30 * 1000, // 30 secs
    max: 1, // limit each IP to 100 requests per windowmS
  })
);

app.post("/mews", (request, response) => {
  //   console.log(request.body);
  // validate
  if (isValidMew(request.body)) {
    // insert into db
    const mew = {
      name: filter.clean(request.body.name.toString()),
      content: filter.clean(request.body.content.toString()),
      created: new Date(),
    };
    // console.log(mew);
    mews.insert(mew).then((createdMew) => {
      response.json(createdMew);
    }); // .insert, .update, .find, etc
  } else {
    // error
    response.status(422);
    response.json({
      message: "Hey! Name and Content are required!",
    });
  }
});

app.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});
