const applyMassiveDamage = (exorcist) => {
    console.log("applying massive damage...")
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log("dice: " + dice);
    const secondDice = Math.floor(Math.random() * 20) + 1;
    console.log("secondDice: " + secondDice);
    switch (dice) {
        case 1: 
            if (secondDice <= 5) {
                console.log("The exorcist has been blinded, deafed and muted!");
                exorcist.battleAttributes.turnsBlinded = 2;
                exorcist.battleAttributes.isBlinded = true;
            }
            else if (secondDice > 5 && secondDice <= 10) {
                console.log("The exorcist has been blinded!");
                exorcist.battleAttributes.turnsBlinded = 2;
                exorcist.battleAttributes.isBlinded = true;
            }
            break;
        case 3:
            exorcist.battleAttributes.isStunned = true; 
            console.log("The exorcist has been stunned!");
            if (secondDice <= 5) exorcist.battleAttributes.turnsStunned = 5;
            else if (secondDice > 5 && secondDice <= 10) exorcist.battleAttributes.turnsStunned = 3;
            else if (secondDice > 10) exorcist.battleAttributes.turnsStunned = 2;
            break;
        case 4: 
            console.log("The exorcist is dying!");
            if (secondDice <= 15) exorcist.battleAttributes.HP = 0;
            break;
    }
}

export default applyMassiveDamage;