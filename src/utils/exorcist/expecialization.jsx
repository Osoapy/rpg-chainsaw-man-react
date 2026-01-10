const attributesList = ["strength", "agility", "body", "mind", "charisma", "spirit"];

const setExpecialization = (baseAttributes, battleAttributes) => {
    let hasSpecializationOnStrength = false;
    let hasSpecializationOnAgility = false;
    let hasSpecializationOnBody = false;
    let hasSpecializationOnMind = false;
    let hasSpecializationOnCharisma = false;
    let hasSpecializationOnSpirit = false;
    for (let i = 0; i < attributesList.length; i++) {
        if (baseAttributes[attributesList[i]] >= 8) {
            switch (attributesList[i]) {
                case "strength":
                    battleAttributes["extraDamageDice"] = "3d10";
                    hasSpecializationOnStrength = true;
                    break;
                case "agility":
                    battleAttributes["defense"] += 10;
                    hasSpecializationOnAgility = true;
                    break;
                case "body":
                    battleAttributes["HP"] += 50;
                    hasSpecializationOnBody = true;
                    break;
                case "mind":
                    hasSpecializationOnMind = true;
                    break;
                case "charisma":
                    hasSpecializationOnCharisma = true;
                    break;
                case "spirit":
                    hasSpecializationOnSpirit = true;
                    break;
            }
        }
    }
    
    let getRandomSpecializationByBeingChief = false;
    while(!getRandomSpecializationByBeingChief) {
        const randomIndex = Math.floor(Math.random() * attributesList.length);
        const randomAttribute = attributesList[randomIndex];
        if (randomAttribute === "strength" && !hasSpecializationOnStrength) {
            battleAttributes["extraDamageDice"] = "3d10";
            console.log("The random expecialization was on strength!");
            getRandomSpecializationByBeingChief = true;
        }
        else if (randomAttribute === "agility" && !hasSpecializationOnAgility) {
            battleAttributes["defense"] += 10;
            console.log("The random expecialization was on agility!");
            getRandomSpecializationByBeingChief = true;
        }
        else if (randomAttribute === "body" && !hasSpecializationOnBody) {
            battleAttributes["HP"] += 50;
            console.log("The random expecialization was on body!");
            getRandomSpecializationByBeingChief = true;
        }
        else if (randomAttribute === "mind" && !hasSpecializationOnMind) {
            console.log("The random expecialization was on mind!");
            getRandomSpecializationByBeingChief = true;
        }
        else if (randomAttribute === "charisma" && !hasSpecializationOnCharisma) {
            console.log("The random expecialization was on charisma!");
            getRandomSpecializationByBeingChief = true;
        }
        else if (randomAttribute === "spirit" && !hasSpecializationOnSpirit) {
            console.log("The random expecialization was on spirit!");
            getRandomSpecializationByBeingChief = true;
        }
    }
}

export default setExpecialization