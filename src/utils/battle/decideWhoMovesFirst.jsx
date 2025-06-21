const decideWhoMovesFirst = (exorcist, demon) => {
    if (demon.level == 6) {
        return "demon";
    }
    else {
        switch (exorcist.role) {
            case "operator" : if (demon.level > 1) return "demon"; else return "exorcist"; break;
            case "foreman" : if (demon.level > 2) return "demon"; else return "exorcist"; break;
            case "supervisor" : if (demon.level > 3) return "demon"; else return "exorcist"; break;
            case "chief": if (demon.level > 4) return "demon"; else return "exorcist"; break;
            default: return "exorcist";
        }
    }
}

export default decideWhoMovesFirst;