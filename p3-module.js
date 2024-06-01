/*
    CIT 281 Project 3
    Name: Jeremy Meltzer
*/

module.exports = {
    coinCount
};

function validDenomination(coin) {
    if ([1,5,10,25,50,100].indexOf(coin) != -1) {
        return true;
    }
}

function valueFromCoinObject(obj) {
    const {denom = 0, count = 0} = obj;
    return denom * count;
}

function valueFromArray(arr) {
    return arr.reduce((total, coin) => total + valueFromCoinObject(coin), 0)
}

function coinCount(...coinage) {
    return valueFromArray(coinage);
}
