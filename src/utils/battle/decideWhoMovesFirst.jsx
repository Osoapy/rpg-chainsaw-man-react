const decideWhoMovesFirst = (exorcist, demon) => {
    if (demon.level == 6) {
        return "demon";
    }
    else {
        switch (exorcist.role) {
            case "operator" : if (demon.fearLevel > 1) return "demon"; else return "exorcist"; break;
            case "foreman" : if (demon.fearLevel > 2) return "demon"; else return "exorcist"; break;
            case "supervisor" : if (demon.fearLevel > 3) return "demon"; else return "exorcist"; break;
            case "chief": if (demon.fearLevel > 4) return "demon"; else return "exorcist"; break;
            default: return "exorcist";
        }
    }
}

export default decideWhoMovesFirst;