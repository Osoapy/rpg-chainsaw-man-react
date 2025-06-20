const setWeapon = (role, battleAttributes, isReforced) => {
    let bonusDamage = 0;
    switch (role) {
        case "operator" : bonusDamage = 5; break;
        case "foreman" : bonusDamage = 5; break;
        case "supervisor" : bonusDamage = 10; break;
        case "chief": bonusDamage = 15; break;
        case "adjunct": bonusDamage = 15; break;
        case "executive": bonusDamage = 20; break;
    }
    if (isReforced) {
        const values = [5, 10, 15];
        const finalValue = values[Math.floor(Math.random() * values.length)];
        bonusDamage += finalValue;
        console.log("It is a reinforced weapon, so the damage is boosted by " + finalValue + "!");
    }
    console.log("The bonus damage from the weapon is " + bonusDamage + "!");

    battleAttributes["weapon"] = bonusDamage;
}

export default setWeapon;