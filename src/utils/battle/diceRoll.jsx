const diceRoll = (dice, doesItNeedToReturnAllDicesUsed) => {
    const regex = /(\d+)d(\d+)([+-]\d+)?/;
    const match = dice.match(regex);
    if (!match) {
        throw new Error("Invalid dice");
    }

    const amount = parseInt(match[1], 10);
    const faces = parseInt(match[2], 10);
    const modifier = match[3] ? parseInt(match[3], 10) : 0;

    const results = Array.from({ length: amount }, () => Math.floor(Math.random() * faces) + 1);
    const biggest = Math.max(...results);
    if (doesItNeedToReturnAllDicesUsed) {
        const obj = {
            dicesPlayed: dice,
            roll: biggest + modifier,
            allDices: results,
            biggest: biggest,
            modifier: modifier,
            sum: results.reduce((a, b) => a + b, 0) + modifier
        }
        return obj;
    }
    return biggest + modifier;
}

export default diceRoll