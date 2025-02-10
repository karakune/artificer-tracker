import "./AbilityScore.css";

export enum AbilityScores {
    STR = "STR",
    DEX = "DEX",
    CON = "CON",
    INT = "INT",
    WIS = "WIS",
    CHA = "CHA"
}

export default function AbilityScore({ability}: {ability: AbilityScores}) {
    return (
        <div className="ability-score">
            <label>{ability.toString()}</label>
            <label>+1</label>
            <label>⦿+1</label>
        </div>
    );
}