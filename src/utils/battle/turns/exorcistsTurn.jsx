import diceRoll from "../diceRoll";
import totalDamage from "../totalDamage";

const exorcistsTurn = (targets, amountOfExorcists, amountOfDemons, listOfExorcists, listOfDemons, deadCounts, arrayOfDeadDemons, p, battleStats) => {
    for(let k = targets.exorcistTarget; k < amountOfExorcists; k++) {
        let exorcistAttack = diceRoll(listOfExorcists[k]["battleAttributes"].attackDice);
        if (listOfExorcists[k]["battleAttributes"].isBlinded == true) {
            const dice = Math.floor(Math.random() * 2) + 1;
            console.log("The exorcist is blinded and is trying to attack!");

            if (dice == 1) exorcistAttack = 0; // else exorcistAttack = exorcistAttack
            
            listOfExorcists[k]["battleAttributes"].turnsBlinded--;
            if (listOfExorcists[k]["battleAttributes"].turnsBlinded == 0) {
                listOfExorcists[k]["battleAttributes"].isBlinded = false;
            }
        }
        if (listOfExorcists[k]["battleAttributes"].isStunned == true) {
            console.log("The exorcist is stunned and can\'t attack!");
            listOfExorcists[k]["battleAttributes"].turnsStunned--;
            if (listOfExorcists[k]["battleAttributes"].turnsStunned == 0) {
                listOfExorcists[k]["battleAttributes"].isStunned = false;
            }
        }
        else if (exorcistAttack >= listOfDemons[targets.demonTarget]["battleAttributes"].defense) {
            const exorcistDamage = totalDamage(listOfExorcists[k]);
            listOfDemons[targets.demonTarget]["battleAttributes"].HP -= exorcistDamage;
            console.log("Exorcist hit Demon and did " + exorcistDamage + " damage! He's with " + listOfDemons[targets.demonTarget]["battleAttributes"].HP + " HP left.");
            if (listOfDemons[targets.demonTarget]["battleAttributes"].HP <= 0) {
                if (targets.demonTarget == amountOfDemons - 1) {
                    console.log("THE BATTLE HAS ENDED!");
                    battleStats["demonsKilled"]++;
                    deadCounts.deadDemons++;
                    arrayOfDeadDemons[p] = deadCounts.deadDemons;
                    battleStats["amountOfExorcistsWins"]++;
                    battleStats["isItOver"] = true;
                    break;
                }
                else {
                    console.log("ONE DEMON HAS FALLEN!");
                    battleStats["demonsKilled"]++;
                    deadCounts.deadDemons++;
                    arrayOfDeadDemons[p] = deadCounts.deadDemons;
                    targets.demonTarget++;
                }
            }
        }
        else {
            console.log("The exorcist missed!");
        }
    }
}

export default exorcistsTurn