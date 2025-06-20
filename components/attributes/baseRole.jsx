const setBaseRole = () => {
    const roles = [
        "operator",
        "foreman",
        "supervisor",
        "chief",
        "adjunct",
        "executive"
    ]
    const finalRole = roles[Math.floor(Math.random() * roles.length)]
    const isBetterThanSupervisor = (finalRole === "supervisor" || 
        finalRole === "chief" || 
        finalRole === "adjunct" || 
        finalRole === "executive");
    return {
        role: finalRole,
        isBetterThanSupervisor: isBetterThanSupervisor
    };
}

export default setBaseRole;