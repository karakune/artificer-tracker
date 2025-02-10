import "./Minion.css";
import AbilityScore from "./AbilityScore.tsx";
import ActionRow from "./ActionRow.tsx";
import {AbilityScores} from "../Models.tsx";

export default function Minion({name, mainColor, subColor}: {name: string, mainColor: string, subColor: string}) {
    return (
        // @ts-ignore
        <div className="minion" style={{"--minion-color": mainColor, "--sub-color": subColor}}>
            <div className="title-row" id="">
                <label className="minion-name">{name}</label>
                <div className="row hp-group">
                    <div className="hp-column">
                        <button className="hp-button">Heal</button>
                        <input className="hp-input" type="number"/>
                        <button className="hp-button">Damage</button>
                    </div>
                    <div className="column">
                        <label>Current/Max</label>
                        <label>38/38</label>
                    </div>
                    <div className="column">
                        <label>Temp</label>
                        <label>38</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div className="ability-score-group">
                        <div className="row">
                            <AbilityScore ability={AbilityScores.STR}/>
                            <AbilityScore ability={AbilityScores.DEX}/>
                            <AbilityScore ability={AbilityScores.CON}/>
                        </div>
                        <div className="row">
                            <AbilityScore ability={AbilityScores.INT}/>
                            <AbilityScore ability={AbilityScores.WIS}/>
                            <AbilityScore ability={AbilityScores.CHA}/>
                        </div>
                    </div>
                    <div className="characteristic-group" id="proficiencies">
                        <label className="title">Proficiencies</label>
                        <label>Athletics +5, Perception +3</label>
                    </div>
                    <div className="characteristic-group" id="passives">
                        <label className="title">Passives</label>
                        <label><b>Vigilant</b> The defender can't be surprised</label>
                    </div>
                </div>
                <div className="column">
                    <div className="row">
                        <div className="info-square">
                            <label>AC</label>
                            <label>15</label>
                        </div>
                        <div className="info-square">
                            <label>Speed</label>
                            <label>25ft</label>
                        </div>
                        <button className="apply-effect">Apply Effect</button>
                    </div>
                    <div className="characteristic-group" id="senses">
                        <label className="title">Senses</label>
                        <label>Darkvision 60ft</label>
                        <label>Passive Perception 16</label>
                    </div>
                    <div className="characteristic-group" id="immunities">
                        <label className="title">Immunities</label>
                        <label><b>Damage</b>: poison</label>
                        <label><b>Conditions</b>: charmed, exhaustion, poisoned</label>
                    </div>
                </div>
            </div>
            <div id="actions">
                <label className="title scooted">Actions</label>
                <ActionRow/>
                <ActionRow/>
            </div>
            <div id="reactions">
                <label className="title scooted">Reactions</label>
                <ActionRow/>
            </div>
        </div>
    );
}