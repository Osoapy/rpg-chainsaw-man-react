import diceRoll from "../diceRoll";
import applyMassiveDamage from "../massiveDamage";
import totalDamage from "../totalDamage";

const demonsTurn = (targets, amountOfDemons, amountOfExorcists, listOfExorcists, listOfDemons, deadCounts, arrayOfDeadExorcists, p, battleStats) => {
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
}

export default demonsTurn;
