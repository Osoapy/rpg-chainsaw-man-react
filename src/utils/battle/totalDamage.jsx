import diceRoll from "./diceRoll";

const totalDamage = (character) => {
    console.log(character);

    const baseDamage = diceRoll(character["battleAttributes"].damageDice);
    let weaponDamage = 0; let extraDamage = 0;
    if (character["battleAttributes"]["weapon"]) {
        weaponDamage = character["battleAttributes"]["weapon"];
    }
    if (character["battleAttributes"]["extraDamage"]) {
        extraDamage = character["battleAttributes"]["extraDamage"];
    }

    return baseDamage + weaponDamage + extraDamage;
}

export default totalDamage;