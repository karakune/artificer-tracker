import "./App.css";
import Minion, {IMinion} from "./Components/Minion.tsx";
import {useRef, useState} from "react";
import MenuContainer from "./Components/MenuContainer.tsx";
import {PopupActiveContext} from "./Contexts/PopupActiveContext.tsx";
import {useSnapshot} from "./Hooks.tsx";

function App() {
    const snapshot = useSnapshot.getState();

    const artificerLevel = useSnapshot((state) => state.artificerLevel);
    const artificerIntMod = useSnapshot((state) => state.artificerIntMod);

    const steelDefender = useSnapshot((state) => state.steelDefender);
    const homServant = useSnapshot((state) => state.homunculusServant);

    const [showMenu, setShowMenu] = useState(false);
    const [isPopupActive, setPopupActive] = useState(false);
    const value = {isPopupActive, setPopupActive}
    const steelDefenderRef = useRef<IMinion>(null);
    const homServantRef = useRef<IMinion>(null);
    let touchStartX = 0;
    let touchEndX = 0;
    let swipeThreshold = 20;


    function onTouchStart(e: any) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function onTouchEnd(e: any) {
        touchEndX = e.changedTouches[0].screenX;
        checkDirection();
    }

    function onClickStart(e: any) {
        touchStartX = e.clientX;
    }

    function onClickEnd(e: any) {
        touchEndX = e.clientX;
        checkDirection();
    }

    function checkDirection() {
        if (isPopupActive) {
            return;
        }

        if (touchEndX < touchStartX && touchStartX - touchEndX > swipeThreshold) {
            onSwipedLeft();
        }
        if (touchEndX > touchStartX && touchEndX - touchStartX > swipeThreshold) {
            onSwipedRight();
        }
    }

    function onSwipedLeft() {
        setShowMenu(false);
    }

    function onSwipedRight() {
        setShowMenu(true);
    }

    function onShortRest() {
        steelDefenderRef.current?.resetEffects();
        steelDefenderRef.current?.promptHitDice();
        homServantRef.current?.resetEffects();
        homServantRef.current?.promptHitDice();

        setShowMenu(false);
    }

    function onLongRest() {
        snapshot.applyLongRest();

        steelDefenderRef.current?.resetEffects();
        homServantRef.current?.resetEffects();

        setShowMenu(false);
    }

    function onSettingsSave(level: number, intMod: number) {
        snapshot.setArtificerLevel(level);
        snapshot.setArtificerIntMod(intMod);
        snapshot.save();

        setShowMenu(false);
    }

    return (
        <PopupActiveContext.Provider value={value}>
            <main className="container" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onMouseDown={onClickStart}
                  onMouseUp={onClickEnd}>
                <MenuContainer isVisible={showMenu} onShortRest={onShortRest} onLongRest={onLongRest} onSettingsSave={onSettingsSave} level={artificerLevel} intMod={artificerIntMod}/>
                <div className="minion-zone">
                    <Minion minionRef={steelDefenderRef} id={0} minion={steelDefender} mainColor="coral"/>
                    <Minion minionRef={homServantRef} id={1} minion={homServant} mainColor="royalblue"/>
                </div>
            </main>
        </PopupActiveContext.Provider>
    );
}

export default App;
