const express = require("express");

const app = express();

const port = process.env.PORT || 3000;
const { calculateSpendPoint, storePointsChange } = require("./utils/utils");

app.use(express.json());

const pointsMap = new Map();
let transactions = [];

// This is the route to get the points of each player
app.get("/point", (req, res) => {
  res.status(200).json(Object.fromEntries(pointsMap));
});

// This is the route to spend points
app.post("/spend", (req, res) => {
  const spentPoints = req.body.points;
  const { results, newTransactions } = calculateSpendPoint(
    spentPoints,
    pointsMap,
    transactions
  );
  transactions = newTransactions;
  res.status(200).send(results);
});

// This is the route to post a transaction for adding points
app.post("/transaction", (req, res) => {
  const { payer, points } = req.body;
  storePointsChange(payer, points, pointsMap);
  transactions.push(req.body);
  res.status(200).json({ status: "success!" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on localhost ${port}`);
});
