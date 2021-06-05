const calculateSpendPoint = (points, map) => {
    

    updatePointsMap(result, pointsMap);
    return result
    
};

const storePointsChange = (payer, pointChange, pointsMap) => {
    const points = pointsMap.get(payer) || 0;
    const newPoints = points + pointChange;
    pointsMap.set(payer, newPoints);
    return newPoints;
};

const updatePointsMap = (result, pointsMap) => {

}

module.exports = { calculateSpendPoint, storePointsChange };
