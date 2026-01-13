const attributesList = ["strength", "agility", "body", "mind", "charisma", "spirit"];

const setExpecialization = (baseAttributes, battleAttributes, role, especializations) => {
    let hasSpecializationOnStrength = false;
    let hasSpecializationOnAgility = false;
    let hasSpecializationOnBody = false;
    let hasSpecializationOnMind = false;
    let hasSpecializationOnCharisma = false;
    let hasSpecializationOnSpirit = false;

    let specializationsLeft = 1;
    if (role === "adjunct") {
        specializationsLeft = 2;
    }
    else if (role === "executive") {
        specializationsLeft = 3;
    }
    while(specializationsLeft > 0) {
        const randomIndex = Math.floor(Math.random() * attributesList.length);
        const randomAttribute = attributesList[randomIndex];
        if (randomAttribute === "strength" && !hasSpecializationOnStrength) {
            battleAttributes["extraDamageDice"] = "3d10";
            console.log("The random expecialization was on strength!");
            especializations.push(randomAttribute);
            hasSpecializationOnStrength = true;
            specializationsLeft -= 1;
        }
        else if (randomAttribute === "agility" && !hasSpecializationOnAgility) {
            battleAttributes["defense"] += 10;
            console.log("The random expecialization was on agility!");
            especializations.push(randomAttribute);
            hasSpecializationOnAgility = true;
            specializationsLeft -= 1;
        }
        else if (randomAttribute === "body" && !hasSpecializationOnBody) {
            battleAttributes["HP"] += 50;
            console.log("The random expecialization was on body!");
            especializations.push(randomAttribute);
            hasSpecializationOnBody = true;
            specializationsLeft -= 1;
        }
        else if (randomAttribute === "mind" && !hasSpecializationOnMind) {
            console.log("The random expecialization was on mind!");
            especializations.push(randomAttribute);
            hasSpecializationOnMind = true;
            specializationsLeft -= 1;
        }
        else if (randomAttribute === "charisma" && !hasSpecializationOnCharisma) {
            console.log("The random expecialization was on charisma!");
            especializations.push(randomAttribute);
            hasSpecializationOnCharisma = true;
            specializationsLeft -= 1;
        }
        else if (randomAttribute === "spirit" && !hasSpecializationOnSpirit) {
            console.log("The random expecialization was on spirit!");
            especializations.push(randomAttribute);
            hasSpecializationOnSpirit = true;
            specializationsLeft -= 1;
        }
    }
}

export default setExpecialization