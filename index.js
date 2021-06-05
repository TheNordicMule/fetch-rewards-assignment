const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/point", (req, res) => {
  res.send("hello world!");
});

app.post("/spend", (req, res) => {
  res.send("hello, world!");
});

app.post("/transaction", (req, res) => {
  res.send("hello, world!");
});

app.listen(3000, () => {
  console.log(`App listening on localhost ${port}`);
});
