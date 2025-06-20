import setBaseAttributes from '../attributes/baseAttributes.jsx';
import setBattleAttributes from '../attributes/battleAttributes.jsx';
import setBaseRole from '../attributes/baseRole.jsx';
import setWeapon from '../exorcist/weapons.jsx';

const createExorcist = () => {
    const position = "exorcist";
    let baseAttributes = setBaseAttributes(position);
    let battleAttributes = setBattleAttributes(position, baseAttributes);
    const distinctive = setBaseRole();
    console.log(baseAttributes, battleAttributes, distinctive);
}

export default createExorcist;