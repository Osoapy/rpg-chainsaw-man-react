import setBaseAttributes from '../attributes/baseAttributes.jsx';
import setBattleAttributes from '../attributes/battleAttributes.jsx';

const createExorcist = () => {
    const position = "exorcist";
    let baseAttributes = setBaseAttributes(position);
    let battleAttributes = setBattleAttributes(position, baseAttributes);
    console.log(baseAttributes, battleAttributes);
}

export default createExorcist;