const express = require("express");
const app = express();

app.get("/", (reqest, response) => {
  response.json({
    message: "Meower! 🐈",
  });
});

app.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});
