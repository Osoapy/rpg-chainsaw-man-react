import diceRoll from "../diceRoll";
import totalDamage from "../totalDamage";

const exorcistsTurn = (targets, amountOfExorcists, amountOfDemons, listOfExorcists, listOfDemons, deadCounts, arrayOfDeadDemons, p, battleStats) => {
    for(let k = targets.exorcistTarget; k < amountOfExorcists; k++) {
        let exorcistAttack = diceRoll(listOfExorcists[k]["battleAttributes"].attackDice);
        if (exorcistAttack >= listOfDemons[targets.demonTarget]["battleAttributes"].defense) {
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