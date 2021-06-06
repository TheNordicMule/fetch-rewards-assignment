const storePointsChange = (payer, pointChange, pointsMap) => {
  const points = pointsMap.get(payer) || 0;
  const newPoints = points + pointChange;
  pointsMap.set(payer, newPoints);
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
  let totalPoints = 0;
  let index = 0;
  let results = [];
  while (totalPoints < spentPoints && index < sortedTransactions.length) {
    const { payer, points, timestamp } = sortedTransactions[index];
    const playerBalance = pointsMap.get(payer);
    const paidPoint = Math.min(points, playerBalance);
    results[payer] = {
      payer,
      points: results[payer] ? results[payer].points - paidPoint : -paidPoint,
    };
    totalPoints += paidPoint;
    if (totalPoints > spentPoints) {
      const overAmount = totalPoints - spentPoints;
      const newTransaction = {
        payer,
        points: overAmount,
        timestamp,
      };
      sortedTransactions.push(newTransaction);
      storePointsChange(payer, overAmount - paidPoint, pointsMap);
      results[payer] = {
        payer,
        points: results[payer].points + overAmount,
      };
      break;
    }
    index += 1;
    storePointsChange(payer, -paidPoint, pointsMap);
  }
  sortedTransactions.splice(0, index + 1);
  results = Object.values(results);
  return { results, newTransactions: sortedTransactions };
};

module.exports = { calculateSpendPoint, storePointsChange };
