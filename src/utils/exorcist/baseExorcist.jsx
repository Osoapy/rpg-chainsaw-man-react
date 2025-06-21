import setBaseAttributes from '../attributes/baseAttributes.jsx';
import setBattleAttributes from '../attributes/battleAttributes.jsx';
import setExpecialization from './expecialization.jsx';
import setWeapon from './weapons.jsx';

const isReforcedPercentage = 0.1;

const createExorcist = (role) => {
    const exorcist = {
        position : "exorcist",
        role : role,
        isBetterThanSupervisor : (role === "chief" || role === "adjunct" || role === "executive"),
        isWeaponReforced : (Math.random() < isReforcedPercentage),
    };
    exorcist["baseAttributes"] = setBaseAttributes(exorcist.position, role);
    exorcist["battleAttributes"] = setBattleAttributes(exorcist.position, exorcist.baseAttributes);
    if (exorcist["isBetterThanSupervisor"]) {
        setExpecialization(exorcist.baseAttributes, exorcist.battleAttributes);
    }
    setWeapon(role, exorcist.battleAttributes, exorcist.isWeaponReforced);

    return exorcist;
}

export default createExorcist;