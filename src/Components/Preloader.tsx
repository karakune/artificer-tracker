import {useEffect, useState} from "react";
import App from "../App.tsx";
import {BaseDirectory, readTextFile} from "@tauri-apps/plugin-fs";
import {Minion as MinionModel} from "../Models.tsx";
import {useSnapshot} from "../Hooks.tsx";

export default function Preloader() {
    const [isDataLoaded, setDataLoaded] = useState(false);
    const setSnapshot = useSnapshot(state => state.setSnapshot);
    const getSnapshot = useSnapshot(state => state.getSnapshot);

    useEffect(() => {
        readTextFile("save.json", {baseDir: BaseDirectory.AppCache})
            .then((text) => {
                console.log("in the then");
                let asJson = JSON.parse(text);
                setSnapshot(
                    asJson.artificerLevel,
                    asJson.artificerIntMod,
                    asJson.steelDefender,
                    asJson.homunculusServant,
                    asJson.steelDefenderIsBlessed,
                    asJson.steelDefenderIsEnlarged,
                    asJson.homunculusServantIsBlessed,
                    asJson.homunculusServantIsEnlarged,
                );
            })
            .catch(() => {
                console.log("in the catch");
                const artificerLevel = 5;
                const artificerIntMod = 4;
                setSnapshot(
                    artificerLevel,
                    artificerIntMod,
                    MinionModel.createSteelDefender(artificerLevel, artificerIntMod),
                    MinionModel.createHomunculusServant(artificerLevel),
                    false,
                    false,
                    false,
                    false,
                );
                getSnapshot().save();
            })
            .finally(() => {
                let snapshot = getSnapshot();
                console.log(snapshot);
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