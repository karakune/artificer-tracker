import {create} from "zustand";
import {BaseDirectory, writeTextFile} from "@tauri-apps/plugin-fs";
import {Minion} from "./Models.tsx";

interface MinionStore {
    artificerLevel: number,
    artificerIntMod: number,
    steelDefender: Minion,
    homunculusServant: Minion,
    setArtificerLevel: (value: number) => void,
    setArtificerIntMod: (value: number) => void,
    setBlessed: (minion: Minion, value: boolean) => void,
    setEnlarged: (minion: Minion, value: boolean) => void,
    setRepairUses: (value: number) => void,
    // setSteelDefender: (value: Minion) => void,
    // setHomunculusServant: (value: Minion) => void,
    applyLongRest: () => void,
    resetEffects: () => void,
    save: () => void
}


export const useMinionStore = create<MinionStore>()((set, get) => ({
    artificerLevel: 0,
    artificerIntMod: 0,
    steelDefender: {} as Minion,
    homunculusServant: {} as Minion,

    setArtificerLevel: (value: number) => {
        set(() => ({artificerLevel: value}));
        updateSteelDefender();
        updateHomunculusServant();
    },

    setArtificerIntMod: (value: number) => {
        set(() => ({artificerIntMod: value}));
        updateSteelDefender();
    },

    setBlessed: (minion: Minion, value: boolean) => {
        if (minion === get().steelDefender) {
            set({steelDefender: {...minion, isBlessed: value}});
        } else if (minion === get().homunculusServant) {
            set({homunculusServant: {...minion, isBlessed: value}});
        } else {
            console.error("minion did not match");
        }
    },

    setEnlarged: (minion: Minion, value: boolean) => {
        if (minion === get().steelDefender) {
            set({steelDefender: {...minion, isEnlarged: value}});
        } else if (minion === get().homunculusServant) {
            set({homunculusServant: {...minion, isEnlarged: value}});
        } else {
            console.error("minion did not match");
        }
    },

    setRepairUses: (value: number) => {
        let sd = structuredClone(get().steelDefender);
        sd.actions[1].currentUses = Math.max(0, Math.min(value, sd.actions[1].maxUses as number));
        set({steelDefender: sd});
    },

    applyLongRest: () => {
        let sd = Minion.createSteelDefender(get().artificerLevel, get().artificerIntMod);
        sd.hitDiceCurrent = Math.min(sd.hitDiceMax, get().steelDefender.hitDiceCurrent + Math.floor(sd.hitDiceMax / 2));

        let hs = Minion.createHomunculusServant(get().artificerLevel);
        hs.hitDiceCurrent = Math.min(hs.hitDiceMax, get().homunculusServant.hitDiceCurrent + Math.floor(hs.hitDiceMax / 2));

        set({
            steelDefender: sd,
            homunculusServant: hs
        });
    },

    resetEffects: () => {
        set({
            steelDefender: {...get().steelDefender, isBlessed: false, isEnlarged: false},
            homunculusServant: {...get().homunculusServant, isBlessed: false, isEnlarged: false},
        });
    },

    // setSteelDefender: (value: Minion) => set(() => ({steelDefender: value})),
    // setHomunculusServant: (value: Minion) => set(() => ({homunculusServant: value})),

    save: async () => {
        await writeTextFile("save.json", JSON.stringify(get(), null, 2), {baseDir: BaseDirectory.AppCache});
    }
}));

const updateSteelDefender = () => {
    let store = useMinionStore.getState();
    let current = store.steelDefender;

    let sd = Minion.createSteelDefender(store.artificerLevel, store.artificerIntMod);
    sd.hpCurrent = Math.min(current.hpCurrent, sd.hpMax);
    sd.hpTemp = current.hpTemp;
    sd.hitDiceCurrent = Math.min(current.hitDiceCurrent, sd.hitDiceMax);
    sd.actions[1].currentUses = current.actions[1].currentUses;
    sd.isBlessed = current.isBlessed;
    sd.isEnlarged = current.isEnlarged;

    useMinionStore.setState({steelDefender: sd});
}

const updateHomunculusServant = () => {
    let store = useMinionStore.getState();
    let current = store.steelDefender;

    let hs = Minion.createHomunculusServant(store.artificerLevel);
    hs.hpCurrent = Math.min(current.hpCurrent, hs.hpMax);
    hs.hpTemp = current.hpTemp;
    hs.hitDiceCurrent = Math.min(current.hitDiceCurrent, hs.hitDiceMax);
    hs.isBlessed = current.isBlessed;
    hs.isEnlarged = current.isEnlarged;

    useMinionStore.setState({homunculusServant: hs});
}