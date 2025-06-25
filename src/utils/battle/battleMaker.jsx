import decideWhoMovesFirst from "./decideWhoMovesFirst.jsx";
import globalValues from "../../config/values.jsx";
import createExorcist from "../exorcist/baseExorcist.jsx";
import createDemon from "../demon/baseDemon.jsx";
import demonsTurn from "./turns/demonsTurn.jsx";
import exorcistsTurn from "./turns/exorcistsTurn.jsx";

const battleMaker = (setBattleStats) => {
    /* Battle variables */
    let battleStats = {
        amountOfExorcistsWins: 0,
        percentageExorcistWin: 0,
        averageOfExorcistsKilledPerBattle: 0,
        averageOfDemonsKilledPerBattle: 0,
        demonsKilled: 0,
        exorcistsKilled: 0,
        isItOver: false,
        percentageOfExorcistsKilled: 0,
        percentageOfDemonsKilled: 0,
    }

    let arrayOfdeadExorcists = [];
    let arrayOfDeadDemons = [];
    
    const exorcistType = globalValues.exorcistType;
    const demonType = globalValues.demonType;
    const fearPercentage = globalValues.demonFearPercentage;
    const amountOfExorcists = globalValues.exorcistAmount;
    const amountOfDemons = globalValues.demonAmount;

    for(let p = 0; p < globalValues.battleAmount; p++) {
        /* Making demons & exorcists */
        let listOfExorcists = [];
        let listOfDemons = [];

        for(let k = 0; k < globalValues.exorcistAmount; k++) {
            listOfExorcists.push(createExorcist(exorcistType));
        }
        for(let k = 0; k < globalValues.demonAmount; k++) {
            listOfDemons.push(createDemon(demonType, fearPercentage));
        }

        console.log(listOfExorcists);
        console.log(listOfDemons);

        battleStats["whoMovesFirst"] = decideWhoMovesFirst(listOfExorcists[0], listOfDemons[0]);
        console.log("Who moves first: " + battleStats["whoMovesFirst"]);
        console.log("Amount of exorcists: " + amountOfExorcists + " and amount of demons: " + amountOfDemons);

        let targets = {
            exorcistTarget: 0,
            demonTarget: 0,
        };
        let deadCounts = {
            deadExorcists: 0,
            deadDemons: 0,
        }

        while (!battleStats["isItOver"]) {
            if (battleStats["whoMovesFirst"] === "exorcist") {
                /* EXORCISTS TURN */
                exorcistsTurn(
                    targets, 
                    amountOfExorcists,
                    amountOfDemons, 
                    listOfExorcists, 
                    listOfDemons, 
                    deadCounts, 
                    arrayOfDeadDemons, 
                    p, 
                    battleStats
                );

                if (battleStats["isItOver"]) break;
                else { /* DEMONS TURN */
                    demonsTurn(
                        targets, 
                        amountOfDemons, 
                        amountOfExorcists, 
                        listOfExorcists, 
                        listOfDemons, 
                        deadCounts, 
                        arrayOfdeadExorcists, 
                        p, 
                        battleStats, 
                        false
                    );
                }

                if (battleStats["isItOver"]) break;
            }
            else {
                /* DEMONS TURN */
                demonsTurn(
                    targets, 
                    amountOfDemons, 
                    amountOfExorcists, 
                    listOfExorcists, 
                    listOfDemons, 
                    deadCounts, 
                    arrayOfdeadExorcists, 
                    p, 
                    battleStats, 
                    false
                );
                
                if (battleStats["isItOver"]) break;
                else { /* EXORCISTS TURN */
                    exorcistsTurn(
                        targets, 
                        amountOfExorcists,
                        amountOfDemons, 
                        listOfExorcists, 
                        listOfDemons, 
                        deadCounts, 
                        arrayOfDeadDemons, 
                        p, 
                        battleStats
                    );
                }

                if (battleStats["isItOver"]) break;
                else { /* SPECIAL DEMONS SECOND TURN */
                    demonsTurn(targets, amountOfDemons, amountOfExorcists, listOfExorcists, listOfDemons, deadCounts, arrayOfdeadExorcists, p, battleStats, true);
                }
                if (battleStats["isItOver"]) break;
            }
        }

        battleStats.isItOver = false;
    }
    battleStats.isItOver = true;

    battleStats["averageOfDemonsKilledPerBattle"] = `${(arrayOfDeadDemons.reduce((accumulator, actual) => accumulator + actual, 0) / globalValues.battleAmount)}`;
    battleStats["averageOfExorcistsKilledPerBattle"] = `${(arrayOfdeadExorcists.reduce((accumulator, actual) => accumulator + actual, 0) / globalValues.battleAmount)}`;

    battleStats["percentageOfDemonsKilled"] = `${(100 * battleStats["demonsKilled"]) / (globalValues.demonAmount * globalValues.battleAmount)}%`;
    battleStats["percentageOfExorcistsKilled"] = `${(100 * battleStats["exorcistsKilled"]) / (globalValues.exorcistAmount * globalValues.battleAmount)}%`;
    battleStats["percentageExorcistWin"] = `${(100 * battleStats["amountOfExorcistsWins"]) / (globalValues.battleAmount)}%`;

    setBattleStats(battleStats);
    console.log(battleStats);
    console.log(arrayOfDeadDemons, arrayOfdeadExorcists);
}

export default battleMaker