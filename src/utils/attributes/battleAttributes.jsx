const setBattleAttributes = (position, baseAttributes, battleAttributes) => {
    let attributes = {};
    if (position == "exorcist") {
        let baseHealth;
        switch (baseAttributes["body"]) {
            case 0: baseHealth = 5; break;
            default: baseHealth = baseAttributes["body"] * 10;
        }
        attributes = {
            defense: battleAttributes["defense"]["value"][baseAttributes["agility"]],
            HP: baseHealth,
            maxHP: baseHealth,
            attackDice: battleAttributes["attackDice"]["value"][baseAttributes["biggestAttribute"]],
            damageDice: battleAttributes["damageDice"]["value"][baseAttributes["strength"]],
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
            if (baseAttributes["level"] < 6) {
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
            else if (baseAttributes["fearPercent"] <= 50) {
                fearLevel = 1;
            }
            else {
                fearLevel = 2;
            }
            console.log("This demon is level " + baseAttributes["level"] + " and has a fear level of " + fearLevel);
            return fearLevel;
        }

        const fearLevel = calculateFearLevel(baseAttributes);
        const demonData = battleAttributes[`demon${baseAttributes["level"]}`][`fear${fearLevel}`];

        attributes = {
            fearLevel: fearLevel,
            defense: demonData.defense,
            HP: demonData.health,
            attackDice: demonData.attackDice,
            damageDice: demonData.damageDice,
        }
    }
    return attributes;
}

export default setBattleAttributes;