const setBattleAttributes = (position, baseAttributes) => {
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
            attackDice: attackDice,
            damageDice: damageDice,
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
        let fearLevel = calculateFearLevel(baseAttributes);
        let baseDefense;
        switch (baseAttributes["level"]) {
            case 1:
                switch (fearLevel) { 
                    case 1: baseDefense = 3; break;
                    case 2: baseDefense = 5; break;
                    case 3: baseDefense = 10; break;
                } 
            break;
            case 2: 
                switch (fearLevel) {
                    case 1: baseDefense = 8; break;
                    case 2: baseDefense = 10; break;
                    case 3: baseDefense = 10; break;
                }
            break;
            case 3: 
                switch (fearLevel) {
                    case 1: baseDefense = 12; break;
                    case 2: baseDefense = 12; break;
                    case 3: baseDefense = 13; break;
                }
            break;
            case 4: 
                switch (fearLevel) { 
                    case 1: baseDefense = 15; break;
                    case 2: baseDefense = 15; break;
                    case 3: baseDefense = 18; break;
                } 
            break;
            case 5: 
                switch (fearLevel) { 
                    case 1: baseDefense = 20; break;
                    case 2: baseDefense = 20; break;
                    case 3: baseDefense = 22; break;
                } 
            break;
            case 6:
                switch (fearLevel) { 
                    case 1: baseDefense = 30; break;
                    case 2: baseDefense = 30; break;
                }
            break;
        }
        let baseHealth;
        switch (baseAttributes["level"]) {
            case 1:
                switch (fearLevel) { 
                    case 1: baseHealth = 5; break;
                    case 2: baseHealth = 20; break;
                    case 3: baseHealth = 40; break;
                } 
            break;
            case 2: 
                switch (fearLevel) { 
                    case 1: baseHealth = 40; break;
                    case 2: baseHealth = 60; break;
                    case 3: baseHealth = 80; break;
                } 
            break;
            case 3: 
                switch (fearLevel) { 
                    case 1: baseHealth = 80; break;
                    case 2: baseHealth = 90; break;
                    case 3: baseHealth = 100; break;
                } 
            break;
            case 4: 
                switch (fearLevel) { 
                    case 1: baseHealth = 120; break;
                    case 2: baseHealth = 130; break;
                    case 3: baseHealth = 150; break;
                } 
            break;
            case 5: 
                switch (fearLevel) { 
                    case 1: baseHealth = 150; break;
                    case 2: baseHealth = 200; break;
                    case 3: baseHealth = 250; break;
                } 
            break;
            case 6: 
                switch (fearLevel) { 
                    case 1: baseHealth = 300; break;
                    case 2: baseHealth = 500; break;
                } 
            break;
        }
        let baseAttackDice;
        switch (baseAttributes["level"]) {
            case 1:
                switch (fearLevel) { 
                    case 1: baseAttackDice = "1d5"; break;
                    case 2: baseAttackDice = "1d10"; break;
                    case 3: baseAttackDice = "1d15"; break;
                } 
            break;
            case 2: 
                switch (fearLevel) { 
                    case 1: baseAttackDice = "1d20"; break;
                    case 2: baseAttackDice = "1d20"; break;
                    case 3: baseAttackDice = "1d20+3"; break;
                } 
            break;
            case 3: 
                switch (fearLevel) { 
                    case 1: baseAttackDice = "1d20+3"; break;
                    case 2: baseAttackDice = "1d20+3"; break;
                    case 3: baseAttackDice = "1d20+3"; break;
                } 
            break;
            case 4: 
                switch (fearLevel) { 
                    case 1: baseAttackDice = "1d20+3"; break;
                    case 2: baseAttackDice = "2d20+3"; break;
                    case 3: baseAttackDice = "2d20+3"; break;
                } 
            break;
            case 5: 
                switch (fearLevel) { 
                    case 1: baseAttackDice = "2d20+5"; break;
                    case 2: baseAttackDice = "2d20+5"; break;
                    case 3: baseAttackDice = "3d20+5"; break;
                } 
            break;
            case 6: 
                switch (fearLevel) { 
                    case 1: baseAttackDice = "4d25+5"; break;
                    case 2: baseAttackDice = "4d30+5"; break;
                } 
            break;
        }
        let baseDamageDice;
        switch (baseAttributes["level"]) {
            case 1:
                switch (fearLevel) { 
                    case 1: baseDamageDice = "1d5"; break;
                    case 2: baseDamageDice = "1d8"; break;
                    case 3: baseDamageDice = "1d10"; break;
                } 
            break;
            case 2: 
                switch (fearLevel) { 
                    case 1: baseDamageDice = "1d10"; break;
                    case 2: baseDamageDice = "1d12"; break;
                    case 3: baseDamageDice = "1d15"; break;
                } 
            break;
            case 3: 
                switch (fearLevel) {
                    case 1: baseDamageDice = "1d12"; break;
                    case 2: baseDamageDice = "1d12+2"; break;
                    case 3: baseDamageDice = "1d15"; break;
                } 
            break;
            case 4: 
                switch (fearLevel) { 
                    case 1: baseDamageDice = "1d15+3"; break;
                    case 2: baseDamageDice = "1d20+5"; break;
                    case 3: baseDamageDice = "1d20+5"; break;
                } 
            break;
            case 5: 
                switch (fearLevel) { 
                    case 1: baseDamageDice = "1d25"; break;
                    case 2: baseDamageDice = "1d25"; break;
                    case 3: baseDamageDice = "1d30+5"; break;
                } 
            break;
            case 6: 
                switch (fearLevel) { 
                    case 1: baseDamageDice = "1d50+10"; break;
                    case 2: baseDamageDice = "1d50+20"; break;
                } 
            break;
        }
        attributes = {
            defense: baseDefense,
            HP: baseHealth,
            attackDice: baseAttackDice,
            damageDice: baseDamageDice
        }
    }
    return attributes;
}

export default setBattleAttributes;