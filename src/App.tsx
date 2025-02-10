import "./App.css";
import Minion from "./Components/Minion.tsx";
import {Minion as MinionModel} from "./Models.tsx";

function App() {
    return (
        <main className="container">
            <div className="minion-zone">
                <Minion minion={MinionModel.createSteelDefender(5, 4)} mainColor="coral"/>
                <Minion minion={MinionModel.createHomunculusServant(5)} mainColor="royalblue"/>
            </div>
        </main>
    );
}

export default App;
