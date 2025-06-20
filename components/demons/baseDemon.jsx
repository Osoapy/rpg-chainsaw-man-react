import setBaseAttributes from '../attributes/baseAttributes.jsx';
import setBattleAttributes from '../attributes/battleAttributes.jsx';

const createDemon = () => {
    const position = "demon";
    let baseAttributes = setBaseAttributes(position);
    let battleAttributes = setBattleAttributes(position, baseAttributes);
    console.log(baseAttributes, battleAttributes);
}

export default createDemon;