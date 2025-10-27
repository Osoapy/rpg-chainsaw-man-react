import diceRoll from "../diceRoll";
import applyMassiveDamage from "../massiveDamage";
import totalDamage from "../totalDamage";

/**
 * Simulates a turn for demons in the battle.
 * @param {Object} targets - Current targets for demons and exorcists.
 * @param {number} amountOfDemons - Total number of demons.
 * @param {number} amountOfExorcists - Total number of exorcists.
 * @param {Array} listOfExorcists - List of exorcist objects.
 * @param {Array} listOfDemons - List of demon objects.
 * @param {Object} deadCounts - Count of dead exorcists and demons.
 * @param {Array} arrayOfDeadExorcists - Array tracking dead exorcists.
 * @param {number} p - Index for the current battle iteration.
 * @param {Object} battleStats - Statistics of the current battle.
 * @param {boolean} isSpecial - Flag for special demon attacks.
*/
const demonsTurn = (targets, amountOfDemons, amountOfExorcists, listOfExorcists, listOfDemons, deadCounts, arrayOfDeadExorcists, p, battleStats, isSpecial) => {
    // Handle regular demon attacks
    if (!isSpecial) {
        for (let j = targets.demonTarget; j < amountOfDemons; j++) {
            let demonAttack = diceRoll(listOfDemons[j]["battleAttributes"].attackDice);
            if (demonAttack >= listOfExorcists[targets.exorcistTarget]["battleAttributes"].defense) {
                const demonDamage = totalDamage(listOfDemons[j]);
                let demonDamageLeft = 0;
                // Check for exorcist HP before attack
                if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP === 0) {
                    listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = -1;
                }
                else if (demonDamage >= listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP * 2) {
                    listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = -1;
                    demonDamageLeft = demonDamage - listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP * 2;
                }
                else {
                    // Apply damage to exorcist
                    listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP -= demonDamage;
                    // Check for massive damage
                    if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP < demonDamage) {
                        applyMassiveDamage(listOfExorcists[targets.exorcistTarget]);
                    }
                    // Ensure HP doesn't go below zero
                    if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP < 0) {
                        demonDamageLeft = Math.abs(listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP);
                        listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = 0;
                    }
                }
                if (demonDamageLeft > 0) {
                    // Apply damage to the next exorcist
                    if (listOfExorcists[targets.exorcistTarget + 1]) {
                        listOfExorcists[targets.exorcistTarget + 1]["battleAttributes"].HP -= demonDamageLeft;
                        // Check for massive damage
                        if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP < demonDamageLeft) {
                            applyMassiveDamage(listOfExorcists[targets.exorcistTarget]);
                        }
                        // Ensure HP doesn't go below zero
                        if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP < 0) {
                            listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = 0;
                        }
                    }
                }
                console.log("Demon hit Exorcist and did " + demonDamage + " damage! He's with " + listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP + " HP left.");
                // Handle exorcist death
                if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP <= 0) {
                    if (targets.exorcistTarget === amountOfExorcists - 1) {
                        console.log("THE BATTLE HAS ENDED!");
                        battleStats["exorcistsKilled"]++;
                        battleStats["isItOver"] = true;
                        deadCounts.deadExorcists++;
                        arrayOfDeadExorcists[p] = deadCounts.deadExorcists;
                        break;
                    } else {
                        console.log("ONE EXORCIST HAS FALLEN!");
                        battleStats["exorcistsKilled"]++;
                        deadCounts.deadExorcists++;
                        arrayOfDeadExorcists[p] = deadCounts.deadExorcists;
                        targets.exorcistTarget++;
                    }
                } else if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP < demonDamage) {
                    applyMassiveDamage(listOfExorcists[targets.exorcistTarget]);
                }
            } else {
                console.log("The demon missed!");
            }
        }
    } else { // Handle special demon attacks
        for (let j = targets.demonTarget; j < amountOfDemons; j++) {
            if (listOfDemons[j].level === 6) {
                let demonAttack = diceRoll(listOfDemons[j]["battleAttributes"].attackDice);
                let demonDamageLeft = 0;
                if (demonAttack >= listOfExorcists[targets.exorcistTarget]["battleAttributes"].defense) {
                    const demonDamage = totalDamage(listOfDemons[j]);
                    if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP === 0) {
                        listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = -1;
                    } 
                    else if (demonDamage >= listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP * 2) {
                        listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = -1;
                        demonDamageLeft = demonDamage - listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP * 2;
                    }
                    else {
                        // Check for insta kill
                        if (demonDamage >= listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP * 2) {
                            listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = -1;
                        }
                        listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP -= demonDamage;
                        if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP < demonDamage) {
                            applyMassiveDamage(listOfExorcists[targets.exorcistTarget]);
                        }
                        if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP < 0) {
                            demonDamageLeft = Math.abs(listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP);
                            listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = 0;
                        }
                    }
                    if (demonDamageLeft > 0) {
                        // Apply damage to the next exorcist
                        if (listOfExorcists[targets.exorcistTarget + 1]) {
                            listOfExorcists[targets.exorcistTarget + 1]["battleAttributes"].HP -= demonDamageLeft;
                            // Check for massive damage
                            if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP < demonDamageLeft) {
                                applyMassiveDamage(listOfExorcists[targets.exorcistTarget]);
                            }
                            // Ensure HP doesn't go below zero
                            if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP < 0) {
                                listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = 0;
                            }
                        }
                    }
                    console.log("Demon hit Exorcist and did " + demonDamage + " damage! He's with " + listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP + " HP left.");
                    if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP <= 0) {
                        if (targets.exorcistTarget === amountOfExorcists - 1) {
                            console.log("THE BATTLE HAS ENDED!");
                            battleStats["exorcistsKilled"]++;
                            deadCounts.deadExorcists++;
                            arrayOfDeadExorcists[p] = deadCounts.deadExorcists;
                            battleStats["isItOver"] = true;
                            break;
                        } else {
                            console.log("ONE EXORCIST HAS FALLEN!");
                            battleStats["exorcistsKilled"]++;
                            deadCounts.deadExorcists++;
                            arrayOfDeadExorcists[p] = deadCounts.deadExorcists;
                            targets.exorcistTarget++;
                        }
                    }
                    if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP < demonDamage) {
                        applyMassiveDamage(listOfExorcists[targets.exorcistTarget]);
                    }
                } else {
                    console.log("The demon missed!");
                }
            }
        }
    }
}

export default demonsTurn;
