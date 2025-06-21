import diceRoll from "./diceRoll";

const totalDamage = (exorcist) => {
    const baseDamage = diceRoll(exorcist["battleAttributes"].damageDice);
    const weaponDamage = exorcist["battleAttributes"]["weapon"];
    const extraDamage = exorcist["battleAttributes"]["extraDamage"];

    return baseDamage + weaponDamage + extraDamage;
}

export default totalDamage;