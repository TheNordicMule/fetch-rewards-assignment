const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const {storePointsChange} = require('./utils/storeTransaction')

app.use(express.json());


const pointsMap = new Map();
const transactions = [];

//This is the route to get the points of each player
app.get("/point", (req, res) => {
  res.send("hello world!");
});

// This is the route to spend points
app.post("/spend", (req, res) => {
  res.send("hello, world!");
});

//This is the route to post a transaction for adding points
app.post("/transaction", (req, res) => {
  const { payer, points, timestamp } = req.body;
  storePointsChange(payer, points, pointsMap);
  transactions.push(req.body);
  console.log(transactions, pointsMap);
  res.status(200).json({ status: "success!" });
});

app.listen(3000, () => {
  console.log(`App listening on localhost ${port}`);
});
