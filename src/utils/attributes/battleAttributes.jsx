const setBattleAttributes = (position, baseAttributes, demonBattleAttributes) => {
    let attributes = {};
    if (position == "exorcist") {
        let baseDefense;
        switch (baseAttributes["agility"]) {
            case 0: baseDefense = 1; break;
            case 1: baseDefense = 3; break;
            case 2: baseDefense = 6; break;
            case 3: baseDefense = 10; break;
            case 4: baseDefense = 14; break;
            case 5: baseDefense = 18; break;
            case 6: baseDefense = 21; break;
            case 7: baseDefense = 22; break;
            case 8: baseDefense = 23; break;
            case 9: baseDefense = 24; break;
            case 10: baseDefense = 25; break;
            default: baseDefense = 0;
        }
        let baseHealth;
        switch (baseAttributes["body"]) {
            case 0: baseHealth = 5; break;
            default: baseHealth = baseAttributes["body"] * 10;
        }
        let attackDice;
        switch (baseAttributes["biggestAttribute"]) {
            case 0: attackDice = "1d10"; break;
            case 1: attackDice = "1d20"; break;
            case 2: attackDice = "1d20+2"; break;
            case 3: attackDice = "1d20+4"; break;
            case 4: attackDice = "1d20+6"; break;
            case 5: attackDice = "1d20+8"; break;
            case 6: attackDice = "1d20+10"; break;
            case 7: attackDice = "2d20+12"; break;
            case 8: attackDice = "2d25+10"; break;
            case 9: attackDice = "3d25+10"; break;
            case 10: attackDice = "3d25+12"; break;
        }
        let damageDice;
        switch (baseAttributes["strength"]) {
            case 0: damageDice = "1d5"; break;
            case 1: damageDice = "1d10"; break;
            case 2: damageDice = "1d20"; break;
            case 3: damageDice = "1d30"; break;
            case 4: damageDice = "1d40"; break;
            case 5: damageDice = "1d50"; break;
            case 6: damageDice = "2d50"; break;
            case 7: damageDice = "3d50"; break;
            case 8: damageDice = "4d50"; break;
            case 9: damageDice = "5d50"; break;
            case 10: damageDice = "5d50+10"; break;
        }
        attributes = {
            defense: baseDefense,
            HP: baseHealth,
            maxHP: baseHealth,
            attackDice: attackDice,
            damageDice: damageDice,
            isStunned: false,
            turnsStunned: 0,
            isBlind: false,
            turnsBlinded: 0,
            extraDamage: 0,
            fear: 0,
        }
    }
    if (position == "demon") {
        const calculateFearLevel = (baseAttributes) => {
            let fearLevel = 0;
            if (!baseAttributes["isSpecial"]) {
                if (baseAttributes["fearPercent"] <= 30) {
                    fearLevel = 1; 
                }
                else if (baseAttributes["fearPercent"] < 61 && baseAttributes["fearPercent"] > 30) {
                    fearLevel = 2;
                }
                else {
                    fearLevel = 3;
                }
            }
            else {
                if (baseAttributes["fearPercent"] <= 50) {
                    fearLevel = 1;
                }
                else {
                    fearLevel = 2;
                }
            }
            console.log("This demon is level " + baseAttributes["level"] + " and has a fear level of " + fearLevel);
            return fearLevel;
        }

        const demonData = demonBattleAttributes[`demon${baseAttributes["level"]}`][`fear${calculateFearLevel(baseAttributes)}`];

        attributes = {
            defense: demonData.defense,
            HP: demonData.health,
            attackDice: demonData.attackDice,
            damageDice: demonData.damageDice,
        }
    }
    return attributes;
}

export default setBattleAttributes;