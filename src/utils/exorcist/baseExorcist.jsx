import setBaseAttributes from '../attributes/baseAttributes.jsx';
import setBattleAttributes from '../attributes/battleAttributes.jsx';
import setExpecialization from './expecialization.jsx';
import setWeapon from './weapons.jsx';

const isReforcedPercentage = 0.1;

const createExorcist = (role) => {
    const position = "exorcist";
    let baseAttributes = setBaseAttributes(position, role);
    let battleAttributes = setBattleAttributes(position, baseAttributes);
    const isBetterThanSupervisor = (
        role === "chief" || 
        role === "adjunct" || 
        role === "executive"
    );
    if (isBetterThanSupervisor) {
        setExpecialization(baseAttributes, battleAttributes);
    }
    const isReforced = (Math.random() < isReforcedPercentage);
    setWeapon(role, battleAttributes, isReforced);
    console.log(baseAttributes, battleAttributes, isBetterThanSupervisor);
}

export default createExorcist;