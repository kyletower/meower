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

app.post("/mews", (request, response) => {
  console.log(request.body);
});

app.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});
