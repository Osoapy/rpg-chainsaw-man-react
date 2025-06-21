import setBattleAttributes from '../attributes/battleAttributes.jsx';

const createDemon = (level, fearPercent) => {
    const demon = {
        position : "demon",
        level : level,
        fearLevel : fearPercent,
    }
    demon["battleAttributes"] = setBattleAttributes(demon.position, {level: level, fearPercent: fearPercent});
    demon["isSpecial"] = false;
    if (level == 6) {
        demon["isSpecial"] = true;
        console.log("This is a special demon!");
    }

    return demon
}

export default createDemon;