const allAttributesLimit = {
    "operator": 10,
    "foreman": 14,
    "supervisor": 15,
    "chief": 18,
    "adjunct": 22,
    "executive": 28
};
const singleAttributesLimit = {
    "operator": 3,
    "foreman": 3,
    "supervisor": 5,
    "chief": 5,
    "adjunct": 5,
    "executive": 8
};
const maxNullAttributes = 1;

const setBaseAttributes = (position, role) => {
    let attributes = {};

    if (position === "exorcist") {
        const keys = ["strength", "agility", "body", "mind", "charisma", "spirit"];
        const maxTotal = allAttributesLimit[role];
        const maxPerAttribute = singleAttributesLimit[role];
        let success = false;

        // Tenta alocar de forma válida até conseguir
        while (!success) {
            attributes = {};
            keys.forEach(k => attributes[k] = 0);
            let remainingPoints = maxTotal;

            // Distribuição aleatória com limite por atributo
            while (remainingPoints > 0) {
                const randomIndex = Math.floor(Math.random() * keys.length);
                const key = keys[randomIndex];

                if (attributes[key] < maxPerAttribute) {
                    attributes[key]++;
                    remainingPoints--;
                }

                const totalPossible = keys.reduce(
                    (sum, k) => sum + (maxPerAttribute - attributes[k]),
                    0
                );
                if (totalPossible === 0 && remainingPoints > 0) break;
            }

            const nullCount = keys.filter(k => attributes[k] === 0).length;
            if (nullCount <= maxNullAttributes) success = true;
        }

        let biggestAtributeValue = 0;
        for (const k of keys) {
            if (k !== "charisma" && attributes[k] > biggestAtributeValue) {
                biggestAtributeValue = attributes[k];
            }
        }

        attributes["biggestAttribute"] = biggestAtributeValue;
        return attributes;
    }

    return attributes;
};

export default setBaseAttributes;
