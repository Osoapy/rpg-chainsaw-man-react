import diceRoll from "./diceRoll";

const totalDamage = (character) => {
    const baseDamage = diceRoll(character["battleAttributes"].damageDice);
    let weaponDamage = 0; let extraDamage = 0; let extraDamageDice = 0;
    if (character["battleAttributes"]["weapon"]) {
        weaponDamage = character["battleAttributes"]["weapon"];
    }
    if (character["battleAttributes"]["extraDamage"]) {
        extraDamage = character["battleAttributes"]["extraDamage"];
    }
    if (character["battleAttributes"]["extraDamageDice"]) {
        extraDamageDice = diceRoll(character["battleAttributes"]["extraDamageDice"], true).sum;
    }

    return baseDamage + weaponDamage + extraDamage + extraDamageDice;
}

export default totalDamage;