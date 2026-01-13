import diceRoll from "../diceRoll";
import applyMassiveDamage from "../massiveDamage";
import totalDamage from "../totalDamage";

const demonsTurn = (targets, amountOfDemons, amountOfExorcists, listOfExorcists, listOfDemons, deadCounts, arrayOfDeadExorcists, p, battleStats) => {
    for (let j = targets.demonTarget; j < amountOfDemons; j++) {
        const turns = listOfDemons[j].level > 5 ? 2 : 1;
        let isThisASecondaryTurn = false;
        for (let turn = 1; turn <= turns; turn++, isThisASecondaryTurn = true) {
            console.log("----------------------------------");
            console.log("DEMON'S TURN! Demon number: ", j);
            console.log("----------------------------------");
            let demonAttack = diceRoll(listOfDemons[j]["battleAttributes"].attackDice);
            let demonTargetForThisTurn = 0;
            if (isThisASecondaryTurn && listOfExorcists[1]) {
                demonTargetForThisTurn = 1;
            }
            if (demonAttack >= listOfExorcists[demonTargetForThisTurn]["battleAttributes"].defense) {
                const demonDamage = totalDamage(listOfDemons[j]);
                console.log("Demon damage for this turn is: ", demonDamage);
                let demonDamageLeft = 0; let didTheDemonKillAnExorcistThisTurn = false;
                // Check for exorcist HP before attack
                if (listOfExorcists[demonTargetForThisTurn]["battleAttributes"].HP === 0) {
                    console.log("ONE EXORCIST HAS FALLEN!");
                    didTheDemonKillAnExorcistThisTurn = true;
                        listOfExorcists.splice(demonTargetForThisTurn, 1);
                        const listOfExorcistsCopy = listOfExorcists.slice();
                        console.log("Exorcists alive rn: ", listOfExorcistsCopy);
                        battleStats["exorcistsKilled"]++;
                        deadCounts.deadExorcists++;
                        arrayOfDeadExorcists[p] = deadCounts.deadExorcists;
                        if (listOfExorcists.length === 0) {
                            console.log("THE BATTLE HAS ENDED!");
                            battleStats["isItOver"] = true;
                            break;
                        }
                    demonDamageLeft = demonDamage;
                    console.log("The demon killed the exorcist! There is ", demonDamageLeft, " leftover damage left");
                }
                // Check for instant kill
                else if (demonDamage >= listOfExorcists[demonTargetForThisTurn]["battleAttributes"].maxHP * 2) {
                    console.log("ONE EXORCIST HAS FALLEN!");
                    didTheDemonKillAnExorcistThisTurn = true;
                    demonDamageLeft = demonDamage - listOfExorcists[demonTargetForThisTurn]["battleAttributes"].maxHP * 2;
                    console.log("The demon did instant kill to the first exorcist!", listOfExorcists[demonTargetForThisTurn]["battleAttributes"].maxHP * 2, " of the damage was used for the IK, now there is ", demonDamageLeft, " left");
                        listOfExorcists.splice(demonTargetForThisTurn, 1);
                        const listOfExorcistsCopy = listOfExorcists.slice();
                        console.log("Exorcists alive rn: ", listOfExorcistsCopy);
                        battleStats["exorcistsKilled"]++;
                        deadCounts.deadExorcists++;
                        arrayOfDeadExorcists[p] = deadCounts.deadExorcists;
                        if (listOfExorcists.length === 0) {
                            console.log("THE BATTLE HAS ENDED!");
                            battleStats["isItOver"] = true;
                            break;
                        }
                }
                else {
                    // Apply damage to exorcist
                    listOfExorcists[demonTargetForThisTurn]["battleAttributes"].HP -= demonDamage;
                    // Check for massive damage
                    if (listOfExorcists[demonTargetForThisTurn]["battleAttributes"].maxHP / 2 < demonDamage) {
                        applyMassiveDamage(listOfExorcists[demonTargetForThisTurn]);
                    }
                    // Ensure HP doesn't go below zero
                    if (listOfExorcists[demonTargetForThisTurn]["battleAttributes"].HP < 0) {
                        demonDamageLeft = Math.abs(listOfExorcists[demonTargetForThisTurn]["battleAttributes"].HP);
                        console.log("The demon did " + (demonDamage - demonDamageLeft) + " damage to an exorcist, he's left dying and now there is ", demonDamageLeft, " leftover damage left.");
                        listOfExorcists[demonTargetForThisTurn]["battleAttributes"].HP = 0;
                    }
                    else {
                        console.log("The demon did " + demonDamage + " damage to an exorcist, he's with " + listOfExorcists[demonTargetForThisTurn]["battleAttributes"].HP + " HP left.");
                    }
                }
                let counter = demonTargetForThisTurn + 1;
                if (didTheDemonKillAnExorcistThisTurn)
                    counter = demonTargetForThisTurn;
                for (let k = counter; demonDamageLeft > 0 && listOfExorcists[k] && (!["chief", "adjunct", "executive"].includes(listOfExorcists[k].role.toLowerCase())); k++) {
                    // Apply damage to the next exorcist
                    console.log("Applying leftover damage to next exorcist...", listOfExorcists[k]);
                    // Check for exorcist HP before attack
                    if (listOfExorcists[k]["battleAttributes"].HP === 0) {
                        console.log("ONE EXORCIST HAS FALLEN!");
                            listOfExorcists.splice(k, 1);
                            const listOfExorcistsCopy = listOfExorcists.slice();
                            console.log("Exorcists alive rn: ", listOfExorcistsCopy);
                            battleStats["exorcistsKilled"]++;
                            deadCounts.deadExorcists++;
                            arrayOfDeadExorcists[p] = deadCounts.deadExorcists;
                            if (listOfExorcists.length === 0) {
                                console.log("THE BATTLE HAS ENDED!");
                                battleStats["isItOver"] = true;
                                break;
                            }
                        console.log("Leftover damage killed the next exorcist that was dying, now there is ", demonDamageLeft, " left");
                    }
                    // Check for instant kill
                    else if (listOfExorcists[k]["battleAttributes"].maxHP * 2 <= demonDamageLeft) {
                        console.log("ONE EXORCIST HAS FALLEN!");
                        demonDamageLeft = demonDamageLeft - listOfExorcists[k]["battleAttributes"].maxHP * 2;
                        console.log(listOfExorcists[k]["battleAttributes"].maxHP * 2, " of the Leftover damage killed the next exorcist by IK, now there is ", demonDamageLeft, " left");
                            listOfExorcists.splice(k, 1);
                            const listOfExorcistsCopy = listOfExorcists.slice();
                            console.log("Exorcists alive rn: ", listOfExorcistsCopy);
                            battleStats["exorcistsKilled"]++;
                            deadCounts.deadExorcists++;
                            arrayOfDeadExorcists[p] = deadCounts.deadExorcists;
                            if (listOfExorcists.length === 0) {
                                console.log("THE BATTLE HAS ENDED!");
                                battleStats["isItOver"] = true;
                                break;
                            }
                    }
                    else {
                        // Apply damage to exorcist
                        const exorcistHPBefore = listOfExorcists[k]["battleAttributes"].HP;
                        listOfExorcists[k]["battleAttributes"].HP -= demonDamageLeft;
                        // Check for massive damage
                        if (listOfExorcists[k]["battleAttributes"].maxHP / 2 < demonDamageLeft) {
                            applyMassiveDamage(listOfExorcists[k]);
                        }
                        // Ensure HP doesn't go below zero
                        if (listOfExorcists[k]["battleAttributes"].HP < 0) {
                            demonDamageLeft = Math.abs(listOfExorcists[k]["battleAttributes"].HP);
                            console.log(exorcistHPBefore, "of the leftover damage left the next exorcist dying, now there is ", demonDamageLeft, " left");
                            listOfExorcists[k]["battleAttributes"].HP = 0;
                        }
                        else {
                            console.log("Leftover damage did " + demonDamageLeft + " damage to another exorcist, he's with " + listOfExorcists[k]["battleAttributes"].HP + " HP left.");
                            break;
                        }
                    }
                }
                if (battleStats["isItOver"]) {
                    break;
                }
            } else {
                console.log("The demon missed!");
            }
        }
    }
}

export default demonsTurn;
