import "./App.css";
import Minion, {IMinion} from "./Components/Minion.tsx";
import {Minion as MinionModel} from "./Models.tsx";
import {useRef, useState} from "react";
import MenuContainer from "./Components/MenuContainer.tsx";
import { PopupActiveContext } from "./Contexts/PopupActiveContext.tsx";

function App() {
    const artificerLevel = 5;
    const artificerIntMod = 4;
    const [steelDefender, setSteelDefender] = useState<MinionModel>(MinionModel.createSteelDefender(artificerLevel, artificerIntMod));
    const [homServant, setHomServant] = useState<MinionModel>(MinionModel.createHomunculusServant(artificerLevel));
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
        homServantRef.current?.resetEffects();
    }

    function onLongRest() {
        let sd = MinionModel.createSteelDefender(artificerLevel, artificerIntMod);
        sd.hitDiceCurrent = Math.min(sd.hitDiceMax, steelDefender.hitDiceCurrent + Math.floor(sd.hitDiceMax / 2));
        setSteelDefender(sd);

        let hs = MinionModel.createHomunculusServant(artificerLevel);
        hs.hitDiceCurrent = Math.min(hs.hitDiceMax, homServant.hitDiceCurrent + Math.floor(hs.hitDiceMax / 2));
        setHomServant(hs);

        steelDefenderRef.current?.resetEffects();
        homServantRef.current?.resetEffects();

        setShowMenu(false);
    }

    return (
        <PopupActiveContext.Provider value={value}>
            <main className="container" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onMouseDown={onClickStart}
                  onMouseUp={onClickEnd}>
                <MenuContainer isVisible={showMenu} onShortRest={onShortRest} onLongRest={onLongRest}/>
                <div className="minion-zone">
                    <Minion minionRef={steelDefenderRef} id={0} minion={steelDefender} mainColor="coral" setMinion={setSteelDefender}/>
                    <Minion minionRef={homServantRef} id={1} minion={homServant} mainColor="royalblue" setMinion={setHomServant}/>
                </div>
            </main>
        </PopupActiveContext.Provider>
    );
}

export default App;
