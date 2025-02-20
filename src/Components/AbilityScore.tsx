import "./AbilityScore.css";
import {AbilityScore as AbilityScoreModel} from "../Models.tsx";

function SavingThrow({ability, pb, isBlessed}: {ability: AbilityScoreModel, pb: number, isBlessed: boolean}) {
    if (!ability.isProficient && !isBlessed) {
        return null;
    }

    let output = ability.isProficient ? "⦿" : "+";
    if (isBlessed) {
        output += "1d4";
    }
    if (ability.isProficient) {
        output += "+" + (ability.bonus + pb);
    }

    return (<label>{output}</label>);
}

export default function AbilityScore({ability, pb, isBlessed}: {ability: AbilityScoreModel, pb: number, isBlessed: boolean}) {
    return (
        <div className="ability-score">
            <label>{ability.ability.toString()}</label>
            <label style={{flex:"1"}}>{ability.bonus >= 0 ? "+" : ""}{ability.bonus}</label>
            <SavingThrow ability={ability} pb={pb} isBlessed={isBlessed}/>
        </div>
    );
}