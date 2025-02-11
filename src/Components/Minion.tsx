import "./Minion.css";
import AbilityScore from "./AbilityScore.tsx";
import ActionRow from "./ActionRow.tsx";
import {Feature as FeatureModel, Minion as MinionModel} from "../Models.tsx";
import {useState} from "react";

export default function Minion({minion, mainColor, setMinion}: {minion: MinionModel, mainColor: string, setMinion: any}) {
    const [hpChangeAmount, setHpChangeAmount] = useState<number>(0);

    function handleHpAmountChange(e: any) {
        e.preventDefault();
        setHpChangeAmount(Number(e.target.value));
    }

    function handleHpTempChange(e: any) {
        e.preventDefault();
        setMinion({...minion, hpTemp: Math.max(0, Number(e.target.value))});
    }

    function healMinion() {
        if (hpChangeAmount == 0) {
            return;
        }

        let newHp = Math.min(minion.hpMax, minion.hpCurrent + hpChangeAmount);

        setMinion({...minion, hpCurrent: newHp});
        setHpChangeAmount(0);
    }

    function damageMinion() {
        if (hpChangeAmount == 0) {
            return;
        }

        let newTemp = Math.max(0, minion.hpTemp - hpChangeAmount);
        let newCurrent = minion.hpCurrent;

        if (newTemp == 0) {
            newCurrent = Math.max(0, minion.hpCurrent - (hpChangeAmount - minion.hpTemp));
        }

        setMinion({...minion, hpCurrent: newCurrent, hpTemp: newTemp});

        setHpChangeAmount(0);
    }

    const Feature = function({feature}: {feature: FeatureModel}) {
        return (
            <label style={{fontSize:"0.9em"}}><b>{feature.title}</b> {feature.description}</label>
        );
    }

    return (
        // @ts-ignore
        <div className="minion" style={{"--minion-color": mainColor}}>
            <div className="title-row">
                <label className="minion-name">{minion.name}</label>
                <div className="row hp-group">
                    <div className="hp-column">
                        <button className="hp-button" onClick={healMinion}>Heal</button>
                        <input className="hp-input" type="number" min="0" step="1"
                               onChange={handleHpAmountChange}/>
                        <button className="hp-button" onClick={damageMinion}>Damage</button>
                    </div>
                    <div className="column">
                        <label>Current/Max</label>
                        <label>{minion.hpCurrent}/{minion.hpMax}</label>
                    </div>
                    <div className="column">
                        <label>Temp</label>
                        <input className="hp-input" type="number" min="0" step="1" placeholder={minion.hpTemp.toString()}
                               onChange={handleHpTempChange}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div className="ability-score-group">
                        <div className="row">
                            <AbilityScore ability={minion.abilityScores[0]} pb={minion.proficiencyBonus}/>
                            <AbilityScore ability={minion.abilityScores[1]} pb={minion.proficiencyBonus}/>
                            <AbilityScore ability={minion.abilityScores[2]} pb={minion.proficiencyBonus}/>
                        </div>
                        <div className="row">
                            <AbilityScore ability={minion.abilityScores[3]} pb={minion.proficiencyBonus}/>
                            <AbilityScore ability={minion.abilityScores[4]} pb={minion.proficiencyBonus}/>
                            <AbilityScore ability={minion.abilityScores[5]} pb={minion.proficiencyBonus}/>
                        </div>
                    </div>
                    <div className="characteristic-group" id="proficiencies">
                        <label className="title">Proficiencies</label>
                        <label>{minion.proficiencies.map((p, i) => {
                            let output = p.name + " +" + p.bonus;
                            if (i + 1 < minion.proficiencies.length) {
                                output += ", ";
                            }
                            return output;
                        })}</label>
                    </div>
                    <div className="characteristic-group" id="passives">
                        <label className="title">Passives</label>
                        {minion.passives.map(p => <Feature key={p.title} feature={p}/>)}
                    </div>
                </div>
                <div className="column">
                    <div className="row">
                        <div className="info-square">
                            <label>AC</label>
                            <label>{minion.ac}</label>
                        </div>
                        <div className="info-square">
                            <label>Speed</label>
                            <label>{minion.speed}ft</label>
                        </div>
                        <button className="apply-effect">Apply Effect</button>
                    </div>
                    <div className="characteristic-group" id="senses">
                        <label className="title">Senses</label>
                        <label>Darkvision 60ft</label>
                        <label>Passive Perception {10 + minion.proficiencies[1].bonus}</label>
                    </div>
                    <div className="characteristic-group" id="immunities">
                        <label className="title">Immunities</label>
                        <label><b>Damage</b>: poison</label>
                        <label><b>Conditions</b>: {minion.conditionImmunities.map((c, i) => {
                            let output = c;
                            if (i + 1 < minion.conditionImmunities.length) {
                                output += ", ";
                            }
                            return output;
                        })}</label>
                    </div>
                </div>
            </div>
            <div id="actions">
                <label className="title scooted">Actions</label>
                {minion.actions.map(a => <ActionRow key={a.name} action={a} pb={minion.proficiencyBonus}/>)}
            </div>
            <div id="reactions">
                <label className="title scooted">Reactions</label>
                {minion.reactions.map(r => <Feature key={r.title} feature={r}/>)}
            </div>
        </div>
    );
}