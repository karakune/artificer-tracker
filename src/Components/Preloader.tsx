import {useEffect, useState} from "react";
import App from "../App.tsx";
import {BaseDirectory, readTextFile} from "@tauri-apps/plugin-fs";
import {Minion as MinionModel} from "../Models.tsx";
import {useSnapshot} from "../Hooks.tsx";

export default function Preloader() {
    const [isDataLoaded, setDataLoaded] = useState(false);
    const snapshot = useSnapshot;

    useEffect(() => {
        readTextFile("save.json", {baseDir: BaseDirectory.AppCache})
            .then((text) => {
                console.log("in the then");
                let asJson = JSON.parse(text);
                snapshot.setState({
                    artificerLevel: asJson.artificerLevel,
                    artificerIntMod: asJson.artificerIntMod,
                    steelDefender: asJson.steelDefender,
                    homunculusServant: asJson.homunculusServant,
                    steelDefenderIsBlessed: asJson.steelDefenderIsBlessed,
                    steelDefenderIsEnlarged: asJson.steelDefenderIsEnlarged,
                    homunculusServantIsBlessed: asJson.homunculusServantIsBlessed,
                    homunculusServantIsEnlarged: asJson.homunculusServantIsEnlarged,
                });
            })
            .catch(() => {
                console.log("in the catch");
                const artificerLevel = 5;
                const artificerIntMod = 4;
                snapshot.setState({
                    artificerLevel: artificerLevel,
                    artificerIntMod: artificerIntMod,
                    steelDefender: MinionModel.createSteelDefender(artificerLevel, artificerIntMod),
                    homunculusServant: MinionModel.createHomunculusServant(artificerLevel),
                    steelDefenderIsBlessed: false,
                    steelDefenderIsEnlarged: false,
                    homunculusServantIsBlessed: false,
                    homunculusServantIsEnlarged: false,
                });
                snapshot.getState().save();
            })
            .finally(() => {
                console.log(snapshot.getState());
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