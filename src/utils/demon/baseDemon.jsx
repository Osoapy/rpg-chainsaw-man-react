import setBattleAttributes from '../attributes/battleAttributes.jsx';

const createDemon = (level, fearPercent, demonBattleAttributes) => {
    const demon = {
        position : "demon",
        level : level,
        fearPercent : fearPercent,
    }
    demon["battleAttributes"] = setBattleAttributes(demon.position, {level: level, fearPercent: fearPercent}, demonBattleAttributes);

    return demon
}

export default createDemon;