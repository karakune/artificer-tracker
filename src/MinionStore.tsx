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
    setName: (minion: Minion, value: string) => void,
    setBlessed: (minion: Minion, value: boolean) => void,
    setEnlarged: (minion: Minion, value: boolean) => void,
    setRepairUses: (value: number) => void,
    setHpTemp: (minion: Minion, value: number) => void,
    healMinion: (minion: Minion, value: number) => void,
    damageMinion: (minion: Minion, value: number) => void,
    spendHitDice: (minion: Minion, hitDiceToSpend: number, healingToApply: number) => void,
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

    setName: (minion: Minion, value: string) => {
        if (minion === get().steelDefender) {
            set({steelDefender: {...minion, name: value}});
        } else if (minion === get().homunculusServant) {
            set({homunculusServant: {...minion, name: value}});
        } else {
            console.error("minion did not match");
        }
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

    setHpTemp: (minion: Minion, value: number) => {
        value = Math.max(0, Number(value));

        if (minion === get().steelDefender) {
            set({steelDefender: {...minion, hpTemp: value}});
        } else if (minion === get().homunculusServant) {
            set({homunculusServant: {...minion, hpTemp: value}});
        } else {
            console.error("minion did not match");
        }
    },

    healMinion: (minion: Minion, value: number) => {
        let newHp = Math.min(minion.hpMax, minion.hpCurrent + value)

        if (minion === get().steelDefender) {
            set({steelDefender: {...minion, hpCurrent: newHp}});
        } else if (minion === get().homunculusServant) {
            set({homunculusServant: {...minion, hpCurrent: newHp}});
        } else {
            console.error("minion did not match");
        }
    },

    damageMinion: (minion: Minion, value: number) => {
        let newTemp = Math.max(0, minion.hpTemp - value);
        let newCurrent = minion.hpCurrent;

        if (newTemp == 0) {
            newCurrent = Math.max(0, minion.hpCurrent - (value - minion.hpTemp));
        }

        if (minion === get().steelDefender) {
            set({steelDefender: {...minion, hpCurrent: newCurrent, hpTemp: newTemp}});
        } else if (minion === get().homunculusServant) {
            set({homunculusServant: {...minion, hpCurrent: newCurrent, hpTemp: newTemp}});
        } else {
            console.error("minion did not match");
        }
    },

    spendHitDice: (minion: Minion, hitDiceToSpend: number, healingToApply: number) => {
        let newHp = Math.min(minion.hpMax, minion.hpCurrent + healingToApply);
        let newHitDice = minion.hitDiceCurrent - hitDiceToSpend;

        if (minion === get().steelDefender) {
            set({steelDefender: {...minion, hpCurrent: newHp, hitDiceCurrent: newHitDice}});
        } else if (minion === get().homunculusServant) {
            set({homunculusServant: {...minion, hpCurrent: newHp, hitDiceCurrent: newHitDice}});
        } else {
            console.error("minion did not match");
        }
    },

    applyLongRest: () => {
        let current = get().steelDefender;
        let sd = Minion.createSteelDefender(get().artificerLevel, get().artificerIntMod);
        sd.name = current.name;
        sd.hitDiceCurrent = Math.min(sd.hitDiceMax, get().steelDefender.hitDiceCurrent + Math.floor(sd.hitDiceMax / 2));

        current = get().homunculusServant;
        let hs = Minion.createHomunculusServant(get().artificerLevel);
        hs.name = current.name;
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

    save: async () => {
        await writeTextFile("save.json", JSON.stringify(get(), null, 2), {baseDir: BaseDirectory.AppCache});
    }
}));

// Private functions
const updateSteelDefender = () => {
    let store = useMinionStore.getState();
    let current = store.steelDefender;

    let sd = Minion.createSteelDefender(store.artificerLevel, store.artificerIntMod);
    sd.name = current.name;
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
    let current = store.homunculusServant;

    let hs = Minion.createHomunculusServant(store.artificerLevel);
    hs.name = current.name;
    hs.hpCurrent = Math.min(current.hpCurrent, hs.hpMax);
    hs.hpTemp = current.hpTemp;
    hs.hitDiceCurrent = Math.min(current.hitDiceCurrent, hs.hitDiceMax);
    hs.isBlessed = current.isBlessed;
    hs.isEnlarged = current.isEnlarged;

    useMinionStore.setState({homunculusServant: hs});
}