import diceRoll from "../diceRoll";
import applyMassiveDamage from "../massiveDamage";
import totalDamage from "../totalDamage";

const demonsTurn = (targets, amountOfDemons, amountOfExorcists, listOfExorcists, listOfDemons, deadCounts, arrayOfDeadExorcists, p, battleStats, isSpecial) => {
    if (!isSpecial) {
        for(let j = targets.demonTarget; j < amountOfDemons; j++) {
            let demonAttack = diceRoll(listOfDemons[j]["battleAttributes"].attackDice);
            if (demonAttack >= listOfExorcists[targets.exorcistTarget]["battleAttributes"].defense) {
                const demonDamage = totalDamage(listOfDemons[j]);
                if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP == 0) {
                    listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = -1;
                }
                else {
                    listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP -= demonDamage;
                    if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP < demonDamage) {
                        applyMassiveDamage(listOfExorcists[targets.exorcistTarget]);
                    }
                    if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP < 0) {
                        listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = 0;
                    }
                }
                console.log("Demon hit Exorcist and did " + demonDamage + " damage! He's with " + listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP + " HP left.");
                if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP < 0) {
                    if (targets.exorcistTarget === amountOfExorcists - 1) {
                        console.log("THE BATTLE HAS ENDED!");
                        battleStats["exorcistsKilled"]++;
                        battleStats["isItOver"] = true;
                        deadCounts.deadExorcists++;
                        arrayOfDeadExorcists[p] = deadCounts.deadExorcists;
                        break;
                    }
                    else {
                        console.log("ONE EXORCIST HAS FALLEN!");
                        battleStats["exorcistsKilled"]++;
                        deadCounts.deadExorcists++;
                        arrayOfDeadExorcists[p] = deadCounts.deadExorcists;
                        targets.exorcistTarget++;
                    }
                }
                else if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP < demonDamage) {
                    applyMassiveDamage(listOfExorcists[targets.exorcistTarget]);
                }
            }
            else {
                console.log("The demon missed!");
            }
        }
    }
    else {
        for(let j = targets.demonTarget; j < amountOfDemons; j++) {
            if (listOfDemons[j].level == 6) {
                let demonAttack = diceRoll(listOfDemons[j]["battleAttributes"].attackDice);
                if (demonAttack >= listOfExorcists[targets.exorcistTarget]["battleAttributes"].defense) {
                    const demonDamage = totalDamage(listOfDemons[j]);
                    if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP == 0) {
                        listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = -1;
                    }
                    else {
                        listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP -= demonDamage;
                        if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].maxHP < demonDamage) {
                            applyMassiveDamage(listOfExorcists[targets.exorcistTarget]);
                        }
                        if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP < 0) {
                            listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP = 0;
                        }
                    }
                    listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP -= demonDamage;
                    console.log("Demon hit Exorcist and did " + demonDamage + " damage! He's with " + listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP + " HP left.");
                    if (listOfExorcists[targets.exorcistTarget]["battleAttributes"].HP < 0) {
                        if (targets.exorcistTarget === amountOfExorcists - 1) {
                            console.log("THE BATTLE HAS ENDED!");
                            battleStats["exorcistsKilled"]++;
                            deadCounts.deadExorcists++;
                            arrayOfDeadExorcists[p] = deadCounts.deadExorcists;
                            battleStats["isItOver"] = true;
                            break;
                        }
                        else {
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
                }
                else {
                    console.log("The demon missed!");
                }
            }
        }
    }
}

export default demonsTurn;