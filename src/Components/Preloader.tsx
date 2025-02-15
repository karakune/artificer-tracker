import {useEffect, useState} from "react";
import App from "../App.tsx";
import {BaseDirectory, readTextFile} from "@tauri-apps/plugin-fs";
import {Minion} from "../Models.tsx";
import {useMinionStore} from "../MinionStore.tsx";

export default function Preloader() {
    const [isDataLoaded, setDataLoaded] = useState(false);
    const minionStore = useMinionStore;

    useEffect(() => {
        readTextFile("save.json", {baseDir: BaseDirectory.AppCache})
            .then((text) => {
                let asJson = JSON.parse(text);
                minionStore.setState({
                    artificerLevel: asJson.artificerLevel,
                    artificerIntMod: asJson.artificerIntMod,
                    steelDefender: asJson.steelDefender,
                    homunculusServant: asJson.homunculusServant,
                });
            })
            .catch(() => {
                const artificerLevel = 5;
                const artificerIntMod = 4;
                minionStore.setState({
                    artificerLevel: artificerLevel,
                    artificerIntMod: artificerIntMod,
                    steelDefender: Minion.createSteelDefender(artificerLevel, artificerIntMod),
                    homunculusServant: Minion.createHomunculusServant(artificerLevel),
                });
                minionStore.getState().save();
            })
            .finally(() => {
                setDataLoaded(true);
            });
    }, [isDataLoaded]);

    return (
        <>
            {!isDataLoaded && <label>loading...</label>}
            {isDataLoaded && <App/>}
        </>
    )
}