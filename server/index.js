const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // adds cors as a middleware, all incoming requests passes through cors which adds the necessary headers to it.
app.use(express.json()); // json body parser, any incoming req with json content type will be parsed by this middleware and put on the body.
app.get("/", (reqest, response) => {
  response.json({
    message: "Meower! 🐈",
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

app.post("/mews", (request, response) => {
  //   console.log(request.body);
  // validate
  if (isValidMew(request.body)) {
    // insert into db
    const mew = {
      name: request.body.name.toString(),
      content: request.body.content.toString(),
    };
    console.log(mew);
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
