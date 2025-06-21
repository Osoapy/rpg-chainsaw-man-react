import diceRoll from "./diceRoll";
import decideWhoMovesFirst from "./decideWhoMovesFirst.jsx";
import totalDamage from "./totalDamage.jsx";
import globalValues from "../../config/values.jsx";
import createExorcist from "../exorcist/baseExorcist.jsx";
import createDemon from "../demon/baseDemon.jsx";

const battleMaker = (setBattleStats) => {
    /* Making demons & exorcists */
    let listOfExorcists = [];
    let listOfDemons = [];

    for(let k = 0; k < globalValues.exorcistAmount; k++) {
        listOfExorcists.push(createExorcist(globalValues.exorcistType));
    }
    for(let k = 0; k < globalValues.demonAmount; k++) {
        listOfDemons.push(createDemon(globalValues.demonType, globalValues.demonFearPercentage));
    }

    console.log(listOfExorcists);
    console.log(listOfDemons);

    /* Battle variables */
    let battleStats = {
        exorcistsKilled: 0,
        demonsKilled: 0,
        percentageOfExorcistsKilled: 0,
        percentageOfDemonsKilled: 0,
        isItOver: false,
        exorcistsWon: false,
        whoMovesFirst: decideWhoMovesFirst(listOfExorcists[0], listOfDemons[0]),
    }

    console.log("Who moves first: " + battleStats["whoMovesFirst"]);

    const amountOfExorcists = listOfExorcists.length;
    const amountOfDemons = listOfDemons.length;

    console.log("Amount of exorcists: " + amountOfExorcists + " and amount of demons: " + amountOfDemons);

    let exorcistTarget = 0;
    let demonTarget = 0;

    while (!battleStats["isItOver"]) {
        if (battleStats["whoMovesFirst"] === "exorcist") {
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
                            battleStats["demonsKilled"]++;
                            battleStats["exorcistsWon"] = true;
                            break;
                        }
                        else {
                            console.log("ONE DEMON HAS FALLEN!");
                            battleStats["demonsKilled"]++;
                            demonTarget++;
                        }
                    }
                }
                else {
                    console.log("The exorcist missed!");
                }
            }
            if (battleStats["isItOver"]) break;
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
                                break;
                            }
                            else {
                                console.log("ONE EXORCIST HAS FALLEN!");
                                battleStats["exorcistsKilled"]++;
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
                            break;
                        }
                        else {
                            console.log("ONE EXORCIST HAS FALLEN!");
                            battleStats["exorcistsKilled"]++;
                            exorcistTarget++;
                        }
                    }
                }
                else {
                    console.log("The demon missed!");
                }
            }
            if (battleStats["isItOver"]) break;
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
                                battleStats["exorcistsWon"] = true;
                                battleStats["isItOver"] = true;
                                break;
                            }
                            else {
                                console.log("ONE DEMON HAS FALLEN!");
                                battleStats["demonsKilled"]++;
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
                                battleStats["isItOver"] = true;
                                break;
                            }
                            else {
                                console.log("ONE EXORCIST HAS FALLEN!");
                                battleStats["exorcistsKilled"]++;
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

    battleStats["percentageOfDemonsKilled"] = `${(100 * battleStats["demonsKilled"]) / globalValues.demonAmount}%`;
    battleStats["percentageOfExorcistsKilled"] = `${(100 * battleStats["exorcistsKilled"]) / globalValues.exorcistAmount}%`;

    setBattleStats(battleStats);
    console.log(battleStats);
}

export default battleMaker