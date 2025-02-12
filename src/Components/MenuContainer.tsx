import "./MenuContainer.css"
import ConfirmationPopup from "./ConfirmationPopup.tsx";
import React, {useContext, useState} from "react";
import {PopupActiveContext} from "../Contexts/PopupActiveContext.tsx";
import SettingsPanel from "./SettingsPanel.tsx";

export default function MenuContainer({isVisible, onShortRest, onLongRest, onSettingsSave, level, intMod}: {isVisible: boolean, onShortRest: () => void, onLongRest: () => void, onSettingsSave: (level: number, intMod: number) => void, level: number, intMod: number}) {
    const [showShortRestConfirm, setShowShortRestConfirm] = useState(false);
    const [showLongRestConfirm, setShowLongRestConfirm] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const {setPopupActive} = useContext(PopupActiveContext);

    return (
        <div className={isVisible ? "slide-menu show" : "slide-menu hide"}>
            <ConfirmationPopup isOpen={showShortRestConfirm} setOpen={setShowShortRestConfirm} onConfirm={onShortRest} onCancel={() => {}}
                               title="Apply short rest?" description="Effects will be reset, and you'll be able to apply unspent hit dice"
            />
            <ConfirmationPopup isOpen={showLongRestConfirm} setOpen={setShowLongRestConfirm} onConfirm={onLongRest} onCancel={() => {}}
                               title="Apply long rest?" description="HP and effects will be reset, and half of max hit dice will be recovered"
            />
            <SettingsPanel isOpen={showSettings} setOpen={setShowSettings} onConfirm={onSettingsSave} onCancel={() => {}} startingLevel={level} startingIntMod={intMod} />
            <div className="menu-zone">
                <div style={{display:"flex", flexFlow: "column", gap:"1vh", marginTop: "3vh"}}>
                    <button className="menu-button" onClick={() => {
                        setShowShortRestConfirm(true);
                        setPopupActive(true);
                    }}>Short Rest</button>
                    <button className="menu-button" onClick={() => {
                        setShowLongRestConfirm(true);
                        setPopupActive(true);
                    }}>Long Rest</button>
                </div>
                <button className="menu-button" onClick={()=> {
                    setShowSettings(true);
                    setPopupActive(true);
                }}>Settings</button>
            </div>
        </div>
    )
}