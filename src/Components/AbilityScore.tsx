import "./AbilityScore.css";
import {AbilityScores} from "../Models.tsx";

export default function AbilityScore({ability}: {ability: AbilityScores}) {
    return (
        <div className="ability-score">
            <label>{ability.toString()}</label>
            <label>+1</label>
            <label>⦿+1</label>
        </div>
    );
}