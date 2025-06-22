import diceRoll from "./diceRoll";
import decideWhoMovesFirst from "./decideWhoMovesFirst.jsx";
import totalDamage from "./totalDamage.jsx";
import globalValues from "../../config/values.jsx";
import createExorcist from "../exorcist/baseExorcist.jsx";
import createDemon from "../demon/baseDemon.jsx";

const battleMaker = (setBattleStats) => {
    /* Battle variables */
    let battleStats = {
        amountOfExorcistsWins: 0,
        averageOfExorcistsKilledPerBattle: 0,
        averageOfDemonsKilledPerBattle: 0,
        demonsKilled: 0,
        exorcistsKilled: 0,
        isItOver: false,
        percentageOfExorcistsKilled: 0,
        percentageOfDemonsKilled: 0,
        percentageExorcistWin: 0,
    }

    let arrayOfDeadExorcists = [];
    let arrayOfDeadDemons = [];

    for(let p = 0; p < globalValues.battleAmount; p++) {
        /* Making demons & exorcists */
        let listOfExorcists = [];
        let listOfDemons = [];
        let deadExorcists = 0, deadDemons = 0;

        for(let k = 0; k < globalValues.exorcistAmount; k++) {
            listOfExorcists.push(createExorcist(globalValues.exorcistType));
        }
        for(let k = 0; k < globalValues.demonAmount; k++) {
            listOfDemons.push(createDemon(globalValues.demonType, globalValues.demonFearPercentage));
        }

        console.log(listOfExorcists);
        console.log(listOfDemons);

        battleStats["whoMovesFirst"] = decideWhoMovesFirst(listOfExorcists[0], listOfDemons[0]);
        console.log("Who moves first: " + battleStats["whoMovesFirst"]);

        const amountOfExorcists = listOfExorcists.length;
        const amountOfDemons = listOfDemons.length;

        console.log("Amount of exorcists: " + amountOfExorcists + " and amount of demons: " + amountOfDemons);

        let exorcistTarget = 0;
        let demonTarget = 0;

        while (!battleStats["isItOver"]) {
            if (battleStats["whoMovesFirst"] === "exorcist") {
                /* EXORCISTS TURN */
                for(let k = exorcistTarget; k < amountOfExorcists; k++) {
                    let exorcistAttack = diceRoll(listOfExorcists[k]["battleAttributes"].attackDice);
                    if (exorcistAttack >= listOfDemons[demonTarget]["battleAttributes"].defense) {
                        const exorcistDamage = totalDamage(listOfExorcists[k]);
                        listOfDemons[demonTarget]["battleAttributes"].HP -= exorcistDamage;
                        console.log("Exorcist hit Demon and did " + exorcistDamage + " damage! He's with " + listOfDemons[demonTarget]["battleAttributes"].HP + " HP left.");
                        if (listOfDemons[demonTarget]["battleAttributes"].HP <= 0) {
                            if (demonTarget === amountOfDemons - 1) {
                                console.log("THE BATTLE HAS ENDED!");
                                battleStats["isItOver"] = true;
                                battleStats["amountOfExorcistsWins"]++;
                                battleStats["demonsKilled"]++;
                                deadDemons++;
                                arrayOfDeadDemons[p] = deadDemons;
                                break;
                            }
                            else {
                                console.log("ONE DEMON HAS FALLEN!");
                                battleStats["demonsKilled"]++;
                                deadDemons++;
                                arrayOfDeadDemons[p] = deadDemons;
                                demonTarget++;
                            }
                        }
                    }
                    else {
                        console.log("The exorcist missed!");
                    }
                }
                if (battleStats["isItOver"]) break;

                /* DEMONS TURN */
                else {
                    for(let j = demonTarget; j < amountOfDemons; j++) {
                        let demonAttack = diceRoll(listOfDemons[j]["battleAttributes"].attackDice);
                        if (demonAttack >= listOfExorcists[exorcistTarget]["battleAttributes"].defense) {
                            const demonDamage = totalDamage(listOfDemons[j]);
                            listOfExorcists[exorcistTarget]["battleAttributes"].HP -= demonDamage;
                            console.log("Demon hit Exorcist and did " + demonDamage + " damage! He's with " + listOfExorcists[exorcistTarget]["battleAttributes"].HP + " HP left.");
                            if (listOfExorcists[exorcistTarget]["battleAttributes"].HP <= 0) {
                                if (exorcistTarget === amountOfExorcists - 1) {
                                    console.log("THE BATTLE HAS ENDED!");
                                    battleStats["isItOver"] = true;
                                    battleStats["exorcistsKilled"]++;
                                    deadExorcists++;
                                    arrayOfDeadExorcists[p] = deadExorcists;
                                    break;
                                }
                                else {
                                    console.log("ONE EXORCIST HAS FALLEN!");
                                    battleStats["exorcistsKilled"]++;
                                    deadExorcists++;
                                    arrayOfDeadExorcists[p] = deadExorcists;
                                    exorcistTarget++;
                                }
                            }
                        }
                        else {
                            console.log("The demon missed!");
                        }
                    }
                }
                if (battleStats["isItOver"]) break;
            }
            else {
                /* DEMONS TURN */
                for(let j = demonTarget; j < amountOfDemons; j++) {
                    let demonAttack = diceRoll(listOfDemons[j]["battleAttributes"].attackDice);
                    if (demonAttack >= listOfExorcists[exorcistTarget]["battleAttributes"].defense) {
                        const demonDamage = totalDamage(listOfExorcists[j]);
                        listOfExorcists[exorcistTarget]["battleAttributes"].HP -= demonDamage;
                        console.log("Demon hit Exorcist and did " + demonDamage + " damage! He's with " + listOfExorcists[exorcistTarget]["battleAttributes"].HP + " HP left.");
                        if (listOfExorcists[exorcistTarget]["battleAttributes"].HP <= 0) {
                            if (exorcistTarget === amountOfExorcists - 1) {
                                console.log("THE BATTLE HAS ENDED!");
                                battleStats["exorcistsKilled"]++;
                                battleStats["isItOver"] = true;
                                deadExorcists++;
                                arrayOfDeadExorcists[p] = deadExorcists;
                                break;
                            }
                            else {
                                console.log("ONE EXORCIST HAS FALLEN!");
                                battleStats["exorcistsKilled"]++;
                                deadExorcists++;
                                arrayOfDeadExorcists[p] = deadExorcists;
                                exorcistTarget++;
                            }
                        }
                    }
                    else {
                        console.log("The demon missed!");
                    }
                }
                if (battleStats["isItOver"]) break;

                /* EXORCISTS TURN */
                else {
                    for(let k = exorcistTarget; k < amountOfExorcists; k++) {
                        let exorcistAttack = diceRoll(listOfExorcists[k]["battleAttributes"].attackDice);
                        if (exorcistAttack >= listOfDemons[demonTarget]["battleAttributes"].defense) {
                            const exorcistDamage = totalDamage(listOfExorcists[k]);
                            listOfDemons[demonTarget]["battleAttributes"].HP -= exorcistDamage;
                            console.log("Exorcist hit Demon and did " + exorcistDamage + " damage! He's with " + listOfDemons[demonTarget]["battleAttributes"].HP + " HP left.");
                            if (listOfDemons[demonTarget]["battleAttributes"].HP <= 0) {
                                if (demonTarget === amountOfDemons - 1) {
                                    console.log("THE BATTLE HAS ENDED!");
                                    battleStats["demonsKilled"]++;
                                    deadDemons++;
                                    arrayOfDeadDemons[p] = deadDemons;
                                    battleStats["amountOfExorcistsWins"]++;
                                    battleStats["isItOver"] = true;
                                    break;
                                }
                                else {
                                    console.log("ONE DEMON HAS FALLEN!");
                                    battleStats["demonsKilled"]++;
                                    deadDemons++;
                                    arrayOfDeadDemons[p] = deadDemons;
                                    demonTarget++;
                                }
                            }
                        }
                        else {
                            console.log("The exorcist missed!");
                        }
                    }
                }
                if (battleStats["isItOver"]) break;

                /* SPECIAL DEMONS SECOND TURN */
                for(let j = demonTarget; j < amountOfDemons; j++) {
                    if (listOfDemons[j].level == 6) {
                        let demonAttack = diceRoll(listOfDemons[j]["battleAttributes"].attackDice);
                        if (demonAttack >= listOfExorcists[exorcistTarget]["battleAttributes"].defense) {
                            const demonDamage = totalDamage(listOfDemons[j]);
                            listOfExorcists[exorcistTarget]["battleAttributes"].HP -= demonDamage;
                            console.log("Demon hit Exorcist and did " + demonDamage + " damage! He's with " + listOfExorcists[exorcistTarget]["battleAttributes"].HP + " HP left.");
                            if (listOfExorcists[exorcistTarget]["battleAttributes"].HP <= 0) {
                                if (exorcistTarget === amountOfExorcists - 1) {
                                    console.log("THE BATTLE HAS ENDED!");
                                    battleStats["exorcistsKilled"]++;
                                    deadExorcists++;
                                    arrayOfDeadExorcists[p] = deadExorcists;
                                    battleStats["isItOver"] = true;
                                    break;
                                }
                                else {
                                    console.log("ONE EXORCIST HAS FALLEN!");
                                    battleStats["exorcistsKilled"]++;
                                    deadExorcists++;
                                    arrayOfDeadExorcists[p] = deadExorcists;
                                    exorcistTarget++;
                                }
                            }
                        }
                        else {
                            console.log("The demon missed!");
                        }
                    }
                }
                if (battleStats["isItOver"]) break;
            }
        }

        battleStats.isItOver = false;
    }

    battleStats["averageOfDemonsKilledPerBattle"] = `${(arrayOfDeadDemons.reduce((accumulator, actual) => accumulator + actual, 0) / globalValues.battleAmount)}`;
    battleStats["averageOfExorcistsKilledPerBattle"] = `${(arrayOfDeadExorcists.reduce((accumulator, actual) => accumulator + actual, 0) / globalValues.battleAmount)}`;

    battleStats["percentageOfDemonsKilled"] = `${(100 * battleStats["demonsKilled"] * globalValues.battleAmount) / (globalValues.demonAmount * globalValues.battleAmount)}%`;
    battleStats["percentageOfExorcistsKilled"] = `${(100 * battleStats["exorcistsKilled"] * globalValues.battleAmount) / (globalValues.exorcistAmount * globalValues.battleAmount)}%`;
    battleStats["percentageExorcistWin"] = `${(100 * battleStats["amountOfExorcistsWins"]) / (globalValues.battleAmount)}%`;

    setBattleStats(battleStats);
    console.log(battleStats);
    console.log(arrayOfDeadDemons, arrayOfDeadExorcists);
}

export default battleMaker