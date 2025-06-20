const setBaseAttributes = (position) => {
    let attributes = {};
    if (position == "exorcist") {
        attributes = {
            "strength": 0,
            "agility": 0,
            "body": 0,
            "mind": 0,
            "charisma": 0,
            "spirit": 0
        };
    }
    if (position == "demon") {
        attributes = {
            "level": 1,
            "fearPercent": 0
        };
    }
    return attributes;
};

export default setBaseAttributes;
