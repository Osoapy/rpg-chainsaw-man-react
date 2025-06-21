import diceRoll from "./diceRoll";
import decideWhoMovesFirst from "./decideWhoMovesFirst";
import totalDamage from "./totalDamage";

const battleMaker = (listOfExorcists, listOfDemons) => {
    let isItOver = false;
    const whoMovesFirst = decideWhoMovesFirst(listOfExorcists[0], listOfDemons[0]); 
    console.log("Who moves first: " + whoMovesFirst);
    const amountOfExorcists = listOfExorcists.length;
    const amountOfDemons = listOfDemons.length;
    console.log("Amount of exorcists: " + amountOfExorcists + " and amount of demons: " + amountOfDemons);
    let exorcistTarget = 0;
    let demonTarget = 0;

    while (!isItOver) {
        if (whoMovesFirst === "exorcist") {
            for(let k = 0; k < amountOfExorcists; k++) {
                let exorcistAttack = diceRoll(listOfExorcists[k]["battleAttributes"].attackDice);
                if (exorcistAttack >= listOfDemons[demonTarget]["battleAttributes"].defense) {
                    const exorcistDamage = totalDamage(listOfExorcists[k]);
                    listOfDemons[demonTarget]["battleAttributes"].HP -= exorcistDamage;
                    console.log("Exorcist hit Demon and did " + exorcistDamage + " damage! He's with " + listOfDemons[demonTarget]["battleAttributes"].HP + " HP left.");
                    if (listOfDemons[demonTarget]["battleAttributes"].HP <= 0) {
                        if (demonTarget === amountOfDemons - 1) {
                            console.log("THE BATTLE HAS ENDED!");
                            isItOver = true;
                            break;
                        }
                        else {
                            console.log("ONE DEMON HAS FALLEN!");
                            demonTarget++;
                        }
                    }
                }
                else {
                    console.log("The exorcist missed!");
                }
            }
            if (isItOver) break;
            else {
                for(let j = 0; j < amountOfDemons; j++) {
                    let demonAttack = diceRoll(listOfDemons[j]["battleAttributes"].attackDice);
                    if (demonAttack >= listOfExorcists[exorcistTarget]["battleAttributes"].defense) {
                        const demonDamage = totalDamage(listOfExorcists[j]);
                        listOfExorcists[exorcistTarget]["battleAttributes"].HP -= demonDamage;
                        console.log("Demon hit Exorcist and did " + demonDamage + " damage! He's with " + listOfExorcists[exorcistTarget]["battleAttributes"].HP + " HP left.");
                        if (listOfExorcists[exorcistTarget]["battleAttributes"].HP <= 0) {
                            if (exorcistTarget === amountOfExorcists - 1) {
                                console.log("THE BATTLE HAS ENDED!");
                                isItOver = true;
                                break;
                            }
                            else {
                                console.log("ONE EXORCIST HAS FALLEN!");
                                exorcistTarget++;
                            }
                        }
                    }
                    else {
                        console.log("The demon missed!");
                    }
                }
            }
            if (isItOver) break;
        }
        else {
            for(let j = 0; j < amountOfDemons; j++) {
                let demonAttack = diceRoll(listOfDemons[j]["battleAttributes"].attackDice);
                if (demonAttack >= listOfExorcists[exorcistTarget]["battleAttributes"].defense) {
                    const demonDamage = totalDamage(listOfExorcists[j]);
                    listOfExorcists[exorcistTarget]["battleAttributes"].HP -= demonDamage;
                    console.log("Demon hit Exorcist and did " + demonDamage + " damage! He's with " + listOfExorcists[exorcistTarget]["battleAttributes"].HP + " HP left.");
                    if (listOfExorcists[exorcistTarget]["battleAttributes"].HP <= 0) {
                        if (exorcistTarget === amountOfExorcists - 1) {
                            console.log("THE BATTLE HAS ENDED!");
                            isItOver = true;
                            break;
                        }
                        else {
                            console.log("ONE EXORCIST HAS FALLEN!");
                            exorcistTarget++;
                        }
                    }
                }
                else {
                    console.log("The demon missed!");
                }
            }
            if (isItOver) break;
            else {
                for(let k = 0; k < amountOfExorcists; k++) {
                    let exorcistAttack = diceRoll(listOfExorcists[k]["battleAttributes"].attackDice);
                    if (exorcistAttack >= listOfDemons[demonTarget]["battleAttributes"].defense) {
                        const exorcistDamage = totalDamage(listOfExorcists[k]);
                        listOfDemons[demonTarget]["battleAttributes"].HP -= exorcistDamage;
                        console.log("Exorcist hit Demon and did " + exorcistDamage + " damage! He's with " + listOfDemons[demonTarget]["battleAttributes"].HP + " HP left.");
                        if (listOfDemons[demonTarget]["battleAttributes"].HP <= 0) {
                            if (demonTarget === amountOfDemons - 1) {
                                console.log("THE BATTLE HAS ENDED!");
                                isItOver = true;
                                break;
                            }
                            else {
                                console.log("ONE DEMON HAS FALLEN!");
                                demonTarget++;
                            }
                        }
                    }
                    else {
                        console.log("The exorcist missed!");
                    }
                }
            }
            if (isItOver) break;
            for(let j = demonTarget; j < amountOfDemons; j++) {
                if (listOfDemons[j].level == 6) {
                    let demonAttack = diceRoll(listOfDemons[j]["battleAttributes"].attackDice);
                    if (demonAttack >= listOfExorcists[exorcistTarget]["battleAttributes"].defense) {
                        const demonDamage = totalDamage(listOfExorcists[j]);
                        listOfExorcists[exorcistTarget]["battleAttributes"].HP -= demonDamage;
                        console.log("Demon hit Exorcist and did " + demonDamage + " damage! He's with " + listOfExorcists[exorcistTarget]["battleAttributes"].HP + " HP left.");
                        if (listOfExorcists[exorcistTarget]["battleAttributes"].HP <= 0) {
                            if (exorcistTarget === amountOfExorcists - 1) {
                                console.log("THE BATTLE HAS ENDED!");
                                isItOver = true;
                                break;
                            }
                            else {
                                console.log("ONE EXORCIST HAS FALLEN!");
                                exorcistTarget++;
                            }
                        }
                    }
                    else {
                        console.log("The demon missed!");
                    }
                }
            }
            if (isItOver) break;
        }
    }
}

export default battleMaker