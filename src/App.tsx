import "./App.css";
import Minion from "./Components/Minion.tsx";
import {Minion as MinionModel} from "./Models.tsx";
import {useState} from "react";
import MenuContainer from "./Components/MenuContainer.tsx";

function App() {
    const [steelDefender, setSteelDefender] = useState<MinionModel>(MinionModel.createSteelDefender(5, 4));
    const [homServant, setHomServant] = useState<MinionModel>(MinionModel.createHomunculusServant(5));
    const [showMenu, setShowMenu] = useState(false);
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

    return (
        <main className="container" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onMouseDown={onClickStart} onMouseUp={onClickEnd}>
            <MenuContainer isVisible={showMenu}/>
            <div className="minion-zone">
                <Minion id={0} minion={steelDefender} mainColor="coral" setMinion={setSteelDefender}/>
                <Minion id={1} minion={homServant} mainColor="royalblue" setMinion={setHomServant}/>
            </div>
        </main>
    );
}

export default App;
