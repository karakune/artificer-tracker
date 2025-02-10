import "./AbilityScore.css";
import {AbilityScore as AbilityScoreModel} from "../Models.tsx";

export default function AbilityScore({ability, pb}: {ability: AbilityScoreModel, pb: number}) {
    return (
        <div className="ability-score">
            <label>{ability.ability.toString()}</label>
            <label style={{flex:"1"}}>{ability.bonus >= 0 ? "+" : ""}{ability.bonus}</label>
            {ability.isProficient && <label>⦿+{ability.bonus + pb}</label>}
        </div>
    );
}