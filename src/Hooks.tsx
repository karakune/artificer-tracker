import {create} from "zustand";
import {BaseDirectory, writeTextFile} from "@tauri-apps/plugin-fs";
import {Minion} from "./Models.tsx";

interface Snapshot {
    artificerLevel: number,
    artificerIntMod: number,
    steelDefender: Minion,
    homunculusServant: Minion,
    steelDefenderIsBlessed: boolean,
    steelDefenderIsEnlarged: boolean,
    homunculusServantIsBlessed: boolean,
    homunculusServantIsEnlarged: boolean,
    // setArtificerLevel: (value: number) => void,
    // setArtificerIntMod: (value: number) => void,
    // setSteelDefender: (value: Minion) => void,
    // setHomunculusServant: (value: Minion) => void,
    // setSteelDefenderIsBlessed: (value: boolean) => void,
    // setSteelDefenderIsEnlarged: (value: boolean) => void,
    // setHomunculusServantIsBlessed: (value: boolean) => void,
    // setHomunculusServantIsEnlarged: (value: boolean) => void,
    getSnapshot: () => Snapshot
    setSnapshot: (
        artificerLevel: number,
        artificerIntMod: number,
        steelDefender: Minion,
        homunculusServant: Minion,
        steelDefenderIsBlessed: boolean,
        steelDefenderIsEnlarged: boolean,
        homunculusServantIsBlessed: boolean,
        homunculusServantIsEnlarged: boolean,
    ) => void,
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

    // setArtificerLevel: (value: number) => set(() => ({artificerLevel: value})),
    // setArtificerIntMod: (value: number) => set(() => ({artificerIntMod: value})),
    // setSteelDefender: (value: Minion) => set(() => ({steelDefender: value})),
    // setHomunculusServant: (value: Minion) => set(() => ({homunculusServant: value})),
    // setSteelDefenderIsBlessed: (value: boolean) => set(() => ({steelDefenderIsBlessed: value})),
    // setSteelDefenderIsEnlarged: (value: boolean) => set(() => ({steelDefenderIsEnlarged: value})),
    // setHomunculusServantIsBlessed: (value: boolean) => set(() => ({homunculusServantIsBlessed: value})),
    // setHomunculusServantIsEnlarged: (value: boolean) => set(() => ({homunculusServantIsEnlarged: value})),

    getSnapshot: () => get(),

    setSnapshot: (
        artificerLevel: number,
        artificerIntMod: number,
        steelDefender: Minion,
        homunculusServant: Minion,
        steelDefenderIsBlessed: boolean,
        steelDefenderIsEnlarged: boolean,
        homunculusServantIsBlessed: boolean,
        homunculusServantIsEnlarged: boolean,
    ) => {
        set({
            artificerLevel,
            artificerIntMod,
            steelDefender,
            homunculusServant,
            steelDefenderIsBlessed,
            steelDefenderIsEnlarged,
            homunculusServantIsBlessed,
            homunculusServantIsEnlarged,
        });
    },

    save: async () => {
        await writeTextFile("save.json", JSON.stringify(get()), {baseDir: BaseDirectory.AppCache});
    }
}));