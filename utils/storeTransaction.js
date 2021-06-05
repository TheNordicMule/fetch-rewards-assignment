const storePointsChange = (payer, pointChange, pointsMap) => {
    const points = pointsMap.get(payer) || 0;
    const newPoints = points + pointChange;
    pointsMap.set(payer, newPoints);
    return newPoints;
};

module.exports = { storePointsChange };
