import "./Minion.css";
import AbilityScore from "./AbilityScore.tsx";
import ActionRow from "./ActionRow.tsx";
import {Feature as FeatureModel, Minion as MinionModel} from "../Models.tsx";
import React, {RefObject, useImperativeHandle, useState} from "react";
import EffectsPanel from "./EffectsPanel.tsx";
import HitDicePanel from "./HitDicePanel.tsx";
import {useMinionStore} from "../MinionStore.tsx";

export interface IMinion {
    promptHitDice: () => void
}

export default function Minion({id, minion, mainColor, minionRef}: {id: number, minion: MinionModel, mainColor: string, minionRef: RefObject<IMinion>}) {
    const minionStore = useMinionStore.getState();
    const [hpChangeAmount, setHpChangeAmount] = useState(0);
    const [isEffectsPanelOpen, setEffectsPanelOpen] = useState(false);
    const [isHitDicePanelOpen, setHitDicePanelOpen] = useState(false);

    useImperativeHandle(minionRef, () => {
        return {
            promptHitDice: function() {
                setHitDicePanelOpen(true);
            }
        };
    });

    function handleHpAmountChange(e: any) {
        e.preventDefault();
        setHpChangeAmount(Number(e.target.value));
    }

    function handleHpTempChange(e: any) {
        e.preventDefault();
        minionStore.setHpTemp(minion, e.target.value);
        minionStore.save();
    }

    function healMinion() {
        if (hpChangeAmount == 0) {
            return;
        }

        minionStore.healMinion(minion, hpChangeAmount);
        minionStore.save()

        setHpChangeAmount(0);
    }

    function damageMinion() {
        if (hpChangeAmount == 0) {
            return;
        }

        minionStore.damageMinion(minion, hpChangeAmount);
        minionStore.save();

        setHpChangeAmount(0);
    }

    function openEffectsPanel() {
        setEffectsPanelOpen(true);
    }

    function setBlessed(value: boolean) {
        minionStore.setBlessed(minion, value);
        minionStore.save();
    }

    function setEnlarged(value: boolean) {
        minionStore.setEnlarged(minion, value);
        minionStore.save();
    }

    function openHitDicePanel() {
        setEffectsPanelOpen(false);
        setHitDicePanelOpen(true);
    }

    function spendHitDice(hitDiceToSpend: number, healingToApply: number) {
        minionStore.spendHitDice(minion, hitDiceToSpend, healingToApply);
        minionStore.save();
    }

    function onUsesChanged(value: boolean) {
        let mod = value ? -1 : 1;
        minionStore.setRepairUses(minion.actions[1].currentUses + mod);
        minionStore.save();
    }

    const Feature = function({feature}: {feature: FeatureModel}) {
        return (
            <label style={{fontSize:"0.9em"}}><b>{feature.title}</b> {feature.description}</label>
        );
    }

    return (
        // @ts-ignore
        <div className="minion" style={{"--minion-color": mainColor}}>
            <EffectsPanel id={id} isOpen={isEffectsPanelOpen} setOpen={setEffectsPanelOpen} isBlessed={minion.isBlessed}
                          setBlessed={setBlessed} isEnlarged={minion.isEnlarged} setEnlarged={setEnlarged}
                          setHitDicePanelOpen={openHitDicePanel}/>
            <HitDicePanel id={id} isOpen={isHitDicePanelOpen} setOpen={setHitDicePanelOpen} minion={minion}
                          onApply={spendHitDice}/>
            <div className="title-row">
                <label className="minion-name">{minion.name}</label>
                <div className="row hp-group">
                    <div className="hp-column">
                        <button className="hp-button" onClick={healMinion}>Heal</button>
                        <input className="hp-input" type="number" min="0" step="1" value={hpChangeAmount != 0 ? hpChangeAmount : ""}
                               onChange={handleHpAmountChange}/>
                        <button className="hp-button" onClick={damageMinion}>Damage</button>
                    </div>
                    <div className="column">
                        <label>Current/Max</label>
                        <label>{minion.hpCurrent}/{minion.hpMax}</label>
                    </div>
                    <div className="column">
                        <label>Temp</label>
                        <input className="hp-input" type="number" min="0" step="1" value={minion.hpTemp != 0 ? minion.hpTemp : ""}
                               onChange={handleHpTempChange}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div className="ability-score-group">
                        <div className="row">
                            <AbilityScore ability={minion.abilityScores[0]} pb={minion.proficiencyBonus} isBlessed={minion.isBlessed}/>
                            <AbilityScore ability={minion.abilityScores[1]} pb={minion.proficiencyBonus} isBlessed={minion.isBlessed}/>
                            <AbilityScore ability={minion.abilityScores[2]} pb={minion.proficiencyBonus} isBlessed={minion.isBlessed}/>
                        </div>
                        <div className="row">
                            <AbilityScore ability={minion.abilityScores[3]} pb={minion.proficiencyBonus} isBlessed={minion.isBlessed}/>
                            <AbilityScore ability={minion.abilityScores[4]} pb={minion.proficiencyBonus} isBlessed={minion.isBlessed}/>
                            <AbilityScore ability={minion.abilityScores[5]} pb={minion.proficiencyBonus} isBlessed={minion.isBlessed}/>
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
                        <button className="apply-effect" onClick={openEffectsPanel}>Apply Effect</button>
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
                {minion.actions.map(a => <ActionRow key={a.name} action={a} pb={minion.proficiencyBonus}
                                                    isBlessed={minion.isBlessed} isEnlarged={minion.isEnlarged}
                                                    onUsesChanged={onUsesChanged}/>)}
            </div>
            <div id="reactions">
                <label className="title scooted">Reactions</label>
                {minion.reactions.map(r => <Feature key={r.title} feature={r}/>)}
            </div>
        </div>
    );
}