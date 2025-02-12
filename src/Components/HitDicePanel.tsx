import Modal from "react-modal";
import React, {useState} from "react";
import {Minion} from "../Models.tsx";

export default function HitDicePanel(
    {
        id,
        isOpen,
        setOpen,
        minion,
        onApply
    }:{
        id: number,
        isOpen: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        minion: Minion
        onApply: (hitDiceToSpend: number, healingToApply: number) => void
    }) {
    const [hitDiceToApply, setHitDiceToApply] = useState(0);
    const [isResultOpen, setResultOpen] = useState(false);

    Modal.setAppElement("#root");

    function onHitDieChange(checked: boolean) {
        let modifier = checked ? 1 : -1;
        setHitDiceToApply(hitDiceToApply + modifier);
    }

    function displayHitDice() {
        const dice = [];
        for (let i = 0; i < minion.hitDiceCurrent; i++) {
            dice.push(<input key={i} type="checkbox" defaultChecked={i < hitDiceToApply}
                             onChange={(e) => onHitDieChange(e.target.checked)}/>)
        }

        return (
            <div className="row">
                {dice}
            </div>
        );
    }

    function applyHitDice() {
        setResultOpen(true);
    }

    function ShowResult({hitDiceToSpend}: {hitDiceToSpend: number}) {
        const [numberRolled, setNumberRolled] = useState(0);

        function onNumberRolledChanged(value: number) {
            setNumberRolled(value);
        }

        function confirmResult() {
            let healingToApply = Math.max(0, numberRolled + minion.abilityScores[2].bonus);
            onApply(hitDiceToSpend, healingToApply);
            setHitDiceToApply(0);
            setResultOpen(false);
            setOpen(false);
        }

        return(
            <Modal
                style={{
                    overlay: {
                        height: "50vh",
                        top: id == 0 ? "0" : "50vh"
                    }
                }}
                isOpen={isResultOpen}>
                <h2 style={{display: "flex", justifyContent: "center"}}>Roll hit dice</h2>
                <div className="column" style={{gap: "20px"}}>
                    <label style={{textAlign: "start"}}>Please roll <b>{hitDiceToSpend}</b>{minion.hitDie}s and enter the result below</label>
                    <input type="number" step="1" min="0" onChange={(e) => {
                        onNumberRolledChanged(Number(e.target.value));
                    }}/>+{minion.abilityScores[2].bonus}
                    <div className="row" style={{justifyContent: "space-evenly"}}>
                        <button onClick={confirmResult}>Confirm</button>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <Modal
            style={{
                overlay: {
                    height: "50vh",
                    top: id == 0 ? "0" : "50vh"
                }
            }}
            isOpen={isOpen} onRequestClose={() => setOpen(false)}
            shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true}>
            <ShowResult hitDiceToSpend={hitDiceToApply}/>
            <h2 style={{display: "flex", justifyContent: "center"}}>Spend hit dice</h2>
            <div className="column" style={{gap: "20px"}}>
                <label style={{textAlign: "start"}}>{minion.name} currently has <b>{minion.hpCurrent}/{minion.hpMax}</b> HP
                    and <b>{minion.hitDiceCurrent}</b> {minion.hitDie}s available out of <b>{minion.hitDiceMax}</b>.
                    How many would you like to spend?</label>
                {displayHitDice()}
                <div className="row" style={{justifyContent: "space-evenly"}}>
                    <button onClick={() => setOpen(false)}>Cancel</button>
                    <button onClick={applyHitDice}>Confirm</button>
                </div>
            </div>
        </Modal>
    )
}