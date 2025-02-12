import Modal from "react-modal";
import React, {useContext, useState} from "react";
import {PopupActiveContext} from "../Contexts/PopupActiveContext.tsx";

export default function SettingsPanel(
    {
        isOpen,
        setOpen,
        onConfirm,
        onCancel,
        startingLevel,
        startingIntMod
    }:{
        isOpen: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        onConfirm: (level: number, intMod: number) => void,
        onCancel: () => void,
        startingLevel: number,
        startingIntMod: number
    }
) {
    const {setPopupActive} = useContext(PopupActiveContext);
    const [level, setLevel] = useState(startingLevel);
    const [intMod, setIntMod] = useState(startingIntMod);

    Modal.setAppElement("#root");

    function handleCancel() {
        setOpen(false);
        setPopupActive(false);
        onCancel();
    }

    function handleConfirm() {
        setOpen(false);
        setPopupActive(false);
        onConfirm(level, intMod);
    }

    function onLevelChanged(value: number) {
        setLevel(value);
    }

    function onIntModChanged(value: number) {
        setIntMod(value);
    }

    return (
        <Modal style={{overlay: {zIndex: 5000}, content: {height: "fit-content"}}} isOpen={isOpen} onRequestClose={handleCancel}
               shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true}>
            <div className="column">
                <h2>Settings</h2>
                <div>
                    <label>Artificer level</label>
                    <input type="number" step="1" min="0" defaultValue={startingLevel} onChange={(e) => {
                        onLevelChanged(Number(e.target.value));
                    }}/>
                </div>
                <br/>
                <div>
                    <label>Artificer Int Modifier</label>
                    <input type="number" step="1" min="0" defaultValue={startingIntMod} onChange={(e) => {
                        onIntModChanged(Number(e.target.value));
                    }}/>
                </div>
                <br/>
                <div className="row" style={{justifyContent: "space-evenly"}}>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </Modal>
    )
}