import Modal from "react-modal";
import React from "react";

export default function EffectsPanel(
    {
        id,
        isOpen,
        setOpen,
        isBlessed,
        setBlessed,
        isEnlarged,
        setEnlarged
    }:{
        id: number,
        isOpen: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        isBlessed: boolean,
        setBlessed: React.Dispatch<React.SetStateAction<boolean>>,
        isEnlarged: boolean,
        setEnlarged: React.Dispatch<React.SetStateAction<boolean>>
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
        <h2>Apply Effects</h2>
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
    </Modal>
    )
}