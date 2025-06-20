const setWeapon = (isReforced) => {
    let bonusDamage = 0;
    switch (level) {
        case 1: bonusDamage = 5;
        case 2: bonusDamage = 10;
        case 3: bonusDamage = 15;
        case 4: bonusDamage = 20;
    }
    if (isReforced) {
        const values = [5, 10, 15];
        const finalValue = values[Math.floor(Math.random() * values.length)];
        bonusDamage += finalValue;
        console.log("It is a reinforced weapon, so the damage is " + finalValue + "!");
    }
    console.log("The bonus damage from the weapon is " + bonusDamage + "!");
    return bonusDamage;
}

export default setWeapon;