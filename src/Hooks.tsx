import {create} from "zustand";
import {BaseDirectory, writeTextFile} from "@tauri-apps/plugin-fs";
import {Minion as MinionModel, Minion} from "./Models.tsx";

interface Snapshot {
    artificerLevel: number,
    artificerIntMod: number,
    steelDefender: Minion,
    homunculusServant: Minion,
    steelDefenderIsBlessed: boolean,
    steelDefenderIsEnlarged: boolean,
    homunculusServantIsBlessed: boolean,
    homunculusServantIsEnlarged: boolean,
    setArtificerLevel: (value: number) => void,
    // setArtificerIntMod: (value: number) => void,
    // setSteelDefender: (value: Minion) => void,
    // setHomunculusServant: (value: Minion) => void,
    // setSteelDefenderIsBlessed: (value: boolean) => void,
    // setSteelDefenderIsEnlarged: (value: boolean) => void,
    // setHomunculusServantIsBlessed: (value: boolean) => void,
    // setHomunculusServantIsEnlarged: (value: boolean) => void,
    save: () => void
}


export const useSnapshot = create<Snapshot>()((set, get) => ({
    artificerLevel: 0,
    artificerIntMod: 0,
    steelDefender: {} as Minion,
    homunculusServant: {} as Minion,
    steelDefenderIsBlessed: false,
    steelDefenderIsEnlarged: false,
    homunculusServantIsBlessed: false,
    homunculusServantIsEnlarged: false,

    setArtificerLevel: (value: number) => {
        set(() => ({artificerLevel: value}));
        updateSteelDefender();
        get().save();
    },
    setArtificerIntMod: (value: number) => set(() => ({artificerIntMod: value})),
    // setSteelDefender: (value: Minion) => set(() => ({steelDefender: value})),
    // setHomunculusServant: (value: Minion) => set(() => ({homunculusServant: value})),
    // setSteelDefenderIsBlessed: (value: boolean) => set(() => ({steelDefenderIsBlessed: value})),
    // setSteelDefenderIsEnlarged: (value: boolean) => set(() => ({steelDefenderIsEnlarged: value})),
    // setHomunculusServantIsBlessed: (value: boolean) => set(() => ({homunculusServantIsBlessed: value})),
    // setHomunculusServantIsEnlarged: (value: boolean) => set(() => ({homunculusServantIsEnlarged: value})),

    save: async () => {
        await writeTextFile("save.json", JSON.stringify(get(), null, 2), {baseDir: BaseDirectory.AppCache});
    }
}));

const updateSteelDefender = () => {
    let snapshot = useSnapshot.getState();
    let current = snapshot.steelDefender;

    let sd = MinionModel.createSteelDefender(snapshot.artificerLevel, snapshot.artificerIntMod);
    sd.hpCurrent = Math.min(current.hpCurrent, sd.hpMax);
    sd.hpTemp = current.hpTemp;
    sd.hitDiceCurrent = Math.min(current.hitDiceCurrent, sd.hitDiceMax);
    sd.actions[1].currentUses = current.actions[1].currentUses;

    useSnapshot.setState({steelDefender: sd});
}