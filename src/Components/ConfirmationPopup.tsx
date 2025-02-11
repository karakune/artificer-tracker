import Modal from "react-modal";
import React, {createContext, useContext} from "react";

export const PopupActiveContext = createContext<any>({isPopupActive: false, setPopupActive: () => {}});

export default function ConfirmationPopup(
    {
        isOpen,
        setOpen,
        onConfirm,
        onCancel,
        title,
        description,
        cancelMessage = "cancel",
        confirmMessage = "confirm"
    }:{
        isOpen: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        onConfirm: () => void,
        onCancel: () => void,
        title: string,
        description: string,
        cancelMessage?: string,
        confirmMessage?: string
    }
) {
    const {setPopupActive} = useContext(PopupActiveContext);

    Modal.setAppElement("#root");

    function handleCancel() {
        setOpen(false);
        setPopupActive(false);
        onCancel();
    }

    function handleConfirm() {
        setOpen(false);
        setPopupActive(false);
        onConfirm();
    }

    return (
        <Modal style={{overlay: {zIndex: 5000}}} isOpen={isOpen} onRequestClose={handleCancel}
               shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true}>
            <h2>{title}</h2>
            <label>{description}</label>
            <button onClick={handleCancel}>{cancelMessage}</button>
            <button onClick={handleConfirm}>{confirmMessage}</button>
        </Modal>
    )
}