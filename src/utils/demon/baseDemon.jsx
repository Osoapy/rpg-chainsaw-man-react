import setBattleAttributes from '../attributes/battleAttributes.jsx';

const createDemon = (level, fearLevel) => {
    const demon = {
        position : "demon",
        level : level,
        fearLevel : fearLevel,
    }
    demon["battleAttributes"] = setBattleAttributes(demon.position, {level: level, fearPercent: fearLevel});
    demon["isSpecial"] = false;
    if (level == 6) {
        demon["isSpecial"] = true;
        console.log("This is a special demon!");
    }

    return demon
}

export default createDemon;