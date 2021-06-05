const storePointsChange = (payer, pointChange, pointsMap) => {
  const points = pointsMap.get(payer) || 0;
  const newPoints = points + pointChange;
  pointsMap.set(payer, newPoints);
  return newPoints;
};

const isSpentPointsTooLarge = (spentPoints, pointsMap) => {
  const totalPoints = Array.from(pointsMap.values()).reduce((a, b) => a + b, 0);
  return spentPoints > totalPoints;
};

// transaction is array, pointsmap is mpa, spentpoints is number
const calculateSpendPoint = (spentPoints, pointsMap, transactions) => {
  // check if the spent value is too large
  if (isSpentPointsTooLarge(spentPoints, pointsMap))
    return {
      results: { success: false, message: "Not enough points from all player" },
    };
  // sortedTransactions is the array of transaction sorted from least recent to most
  const sortedTransactions = transactions.sort(
    (first, second) => new Date(first.timestamp) - new Date(second.timestamp)
  );
  let remainingSpentPoints = spentPoints;
  let index = 0;
  let results = [];
  let sortedTransaction = sortedTransactions[index];
  while (remainingSpentPoints - sortedTransaction.points > 0) {
    const playerPoint = pointsMap.get(sortedTransaction.payer);
    const substractedPoint = Math.min(playerPoint, sortedTransaction.points);
    remainingSpentPoints -= substractedPoint;
    const { payer, points } = sortedTransaction;
    results[payer] = results[payer]
      ? { payer, points: results[payer].points - points }
      : { payer, points: -points };
    storePointsChange(payer, -points, pointsMap);
    index += 1;
    sortedTransaction = sortedTransactions[index];
  }
  const lastTransaction = sortedTransactions[index];
  const { points: newAmount, payer, timestamp } = lastTransaction;
  const newTransaction = {
    payer,
    points: newAmount - remainingSpentPoints,
    timestamp,
  };
  results[payer] = results[payer]
    ? { payer, points: results[payer].points - remainingSpentPoints }
    : { payer, points: -remainingSpentPoints };
  results = Object.values(results);
  storePointsChange(payer, -remainingSpentPoints, pointsMap);
  sortedTransactions.splice(0, index + 1, newTransaction);
  return { results, newTransactions: sortedTransactions };
};

module.exports = { calculateSpendPoint, storePointsChange };
