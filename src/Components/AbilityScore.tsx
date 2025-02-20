import "./AbilityScore.css";
import {AbilityScore as AbilityScoreModel, AbilityScores, Minion} from "../Models.tsx";

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

export default function AbilityScore({abilityName, minion}: {abilityName: AbilityScores, minion: Minion}) {
    let ability = minion.abilityScores[abilityName];

    return (
        <div className="ability-score">
            <label>{abilityName}</label>
            <label style={{flex:"1"}}>{ability.bonus >= 0 ? "+" : ""}{ability.bonus}</label>
            <SavingThrow ability={ability} pb={minion.proficiencyBonus} isBlessed={minion.isBlessed}/>
        </div>
    );
}