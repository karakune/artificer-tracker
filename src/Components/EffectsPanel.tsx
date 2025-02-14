import Modal from "react-modal";
import React from "react";

export default function EffectsPanel(
    {
        id,
        isOpen,
        setOpen,
        setHitDicePanelOpen,
        isBlessed,
        setBlessed,
        isEnlarged,
        setEnlarged
    }:{
        id: number,
        isOpen: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        setHitDicePanelOpen: React.Dispatch<void>,
        isBlessed: boolean,
        setBlessed: (value: boolean) => void,
        isEnlarged: boolean,
        setEnlarged: (value: boolean) => void
    }) {

    Modal.setAppElement("#root");

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
            <div className="column">
                <h2>Apply Effects</h2>
                <div className="column" style={{gap:"10px"}}>
                    <div>
                        <input type="checkbox" defaultChecked={isBlessed}
                               onChange={(e) => setBlessed(e.target.checked)}/>
                        <label>Bless</label>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={isEnlarged}
                               onChange={(e) => setEnlarged(e.target.checked)}/>
                        <label>Enlarge</label>
                    </div>
                    <button onClick={() => {
                        setHitDicePanelOpen();
                        setOpen(false);
                    }}>Spend hit dice</button>
                </div>
            </div>
        </Modal>
    )
}