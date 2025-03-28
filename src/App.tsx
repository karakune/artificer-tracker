import "./App.css";
import Minion, {IMinion} from "./Components/Minion.tsx";
import {useRef, useState} from "react";
import MenuContainer from "./Components/MenuContainer.tsx";
import {PopupActiveContext} from "./Contexts/PopupActiveContext.tsx";
import {useMinionStore} from "./MinionStore.tsx";

function App() {
    const minionStore = useMinionStore.getState();

    const artificerLevel = useMinionStore((state) => state.artificerLevel);
    const artificerIntMod = useMinionStore((state) => state.artificerIntMod);

    const steelDefender = useMinionStore((state) => state.steelDefender);
    const homServant = useMinionStore((state) => state.homunculusServant);

    const [showMenu, setShowMenu] = useState(false);
    const [isPopupActive, setPopupActive] = useState(false);
    const popupActiveState = {isPopupActive, setPopupActive}

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
        minionStore.resetEffects();
        minionStore.save();
        steelDefenderRef.current?.promptHitDice();
        homServantRef.current?.promptHitDice();

        setShowMenu(false);
    }

    function onLongRest() {
        minionStore.applyLongRest();
        minionStore.save();

        minionStore.resetEffects();
        minionStore.save();

        setShowMenu(false);
    }

    function onSettingsSave(level: number, intMod: number, sdName: string, hsName: string) {
        console.log(sdName);
        console.log(hsName);
        minionStore.setName(minionStore.steelDefender, sdName);
        minionStore.setName(minionStore.homunculusServant, hsName);
        minionStore.setArtificerLevel(level);
        minionStore.setArtificerIntMod(intMod);
        minionStore.save();

        setShowMenu(false);
    }

    return (
        <PopupActiveContext.Provider value={popupActiveState}>
            <main className="container" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onMouseDown={onClickStart}
                  onMouseUp={onClickEnd}>
                <MenuContainer isVisible={showMenu} onShortRest={onShortRest} onLongRest={onLongRest} onSettingsSave={onSettingsSave} level={artificerLevel} intMod={artificerIntMod} sdName={minionStore.steelDefender.name} hsName={minionStore.homunculusServant.name}/>
                <div className="minion-zone">
                    <Minion minionRef={steelDefenderRef} id={0} minion={steelDefender} mainColor="coral"/>
                    <Minion minionRef={homServantRef} id={1} minion={homServant} mainColor="royalblue"/>
                </div>
            </main>
        </PopupActiveContext.Provider>
    );
}

export default App;
