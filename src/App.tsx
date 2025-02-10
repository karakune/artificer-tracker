import "./App.css";
import Minion from "./Components/Minion.tsx";

function App() {
    return (
        <main className="container">
            <div className="minion-zone">
                <Minion name="Steel Defender" mainColor="coral" subColor="lightcoral"/>
                <Minion name="Homunculus Servant" mainColor="royalblue" subColor="cornflowerblue"/>
            </div>
        </main>
    );
}

export default App;
