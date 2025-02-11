import "./App.css";
import Minion from "./Components/Minion.tsx";
import {Minion as MinionModel} from "./Models.tsx";
import {useState} from "react";

function App() {
    const [steelDefender, setSteelDefender] = useState<MinionModel>(MinionModel.createSteelDefender(5, 4));
    const [homServant, setHomServant] = useState<MinionModel>(MinionModel.createHomunculusServant(5));

    return (
        <main className="container">
            <div className="minion-zone">
                <Minion minion={steelDefender} mainColor="coral" setMinion={setSteelDefender}/>
                <Minion minion={homServant} mainColor="royalblue" setMinion={setHomServant}/>
            </div>
        </main>
    );
}

export default App;
