export enum AbilityScores {
    STR = "STR",
    DEX = "DEX",
    CON = "CON",
    INT = "INT",
    WIS = "WIS",
    CHA = "CHA"
}

export enum HitDice {
    d4 = 4,
    d8 = 8
}

export class Minion {
    public proficiencyBonus: number = 0;
    public name: string = "";
    public abilityScores: AbilityScore[] = [];
    public hpMax: number = 0;
    public hpCurrent: number = 0;
    public hitDiceMax: number = 0;
    public hitDiceCurrent: number = 0;
    public hitDie: HitDice = HitDice.d4;
    public ac: number = 0;
    public speed: number = 0;
    public proficiencies: Proficiency[] = [];
    public passives: Feature[] = [];
    public actions: Action[] = [];
    public reactions: Feature[] = [];
    public conditionImmunities: string[] = [];


    private constructor(init: Partial<Minion>) {
        Object.assign(this, init);
    }

    private static computeProficiencyBonus(artificerLevel: number) {
        return 2 + Math.ceil(artificerLevel / 4);
    }

    public static createSteelDefender(artificerLevel: number, artificerIntMod: number) : Minion {
        let pb = this.computeProficiencyBonus(artificerLevel);
        let hpMax = 2 + artificerIntMod + (5 * artificerLevel);
        return new Minion({
            name: "SteelDefender",
            proficiencyBonus: pb,
            abilityScores: [
                new AbilityScore(AbilityScores.STR, 2, false),
                new AbilityScore(AbilityScores.DEX, 1, true),
                new AbilityScore(AbilityScores.CON, 2, true),
                new AbilityScore(AbilityScores.INT, -3, false),
                new AbilityScore(AbilityScores.WIS, 0, false),
                new AbilityScore(AbilityScores.CHA, -2, false)
            ],
            hpMax: hpMax,
            hpCurrent: hpMax,
            hitDie: HitDice.d8,
            hitDiceMax: artificerLevel,
            hitDiceCurrent: artificerLevel,
            ac: 15,
            speed: 40,
            proficiencies: [
                new Proficiency("Athletics", 2 + pb),
                new Proficiency("Perception", 2 * pb)
            ],
            conditionImmunities: [
                "Charmed",
                "Exhaustion",
                "Poisoned"
            ],
            passives: [
                new Feature("Vigilant", "The defender can't be surprised")
            ],
            actions: [
                new Action("Force-Empowered Rend", 1, HitDice.d8, 5, artificerIntMod + pb),
                new Action("Repair", 2, HitDice.d8, 5, undefined, 3)
            ],
            reactions: [
                new Feature("Deflect Attack", "Disadvantage on one attack roll on other within 5ft")
            ]
        });
    }

    public static createHomunculusServant(artificerLevel: number) : Minion {
        let pb = this.computeProficiencyBonus(artificerLevel);
        return new Minion({
            name: "Homunculus Servant",
            proficiencyBonus: pb,
            abilityScores: [
                new AbilityScore(AbilityScores.STR, -3, false),
                new AbilityScore(AbilityScores.DEX, 2, true),
                new AbilityScore(AbilityScores.CON, 1, false),
                new AbilityScore(AbilityScores.INT, 0, false),
                new AbilityScore(AbilityScores.WIS, 0, false),
                new AbilityScore(AbilityScores.CHA, -2, false)
            ],
            hpMax: 10,
            hpCurrent: 10,
            hitDie: HitDice.d4,
            hitDiceMax: 1,
            hitDiceCurrent: 1,
            ac: 13,
            speed: 40,
            proficiencies: [
                new Proficiency("Stealth", 2 + pb),
                new Proficiency("Perception", 2 + pb)
            ],
            conditionImmunities: [
                "Exhaustion",
                "Poisoned"
            ],
            passives: [
                new Feature("Evasion", "Dex save - success: no damage, failure: ½ damage")
            ],
            actions: [
                new Action("Force Strike", 1, HitDice.d4, 30, 2 + pb)
            ],
            reactions: [
                new Feature("Channel Magic", "Deliver a spell with range of touch (while within 120ft)")
            ]
        });
    }
}

export class AbilityScore {
    constructor(public ability: AbilityScores, public bonus: number, public isProficient: boolean) {
    }
}

export class Proficiency {
    constructor(public name: string, public bonus: number) {
    }
}

export class Feature {
    constructor(public title: string, public description: string) {
    }
}

export class Action {
    public currentUses?: number;
    constructor(public name: string,
                public damageDiceCount: number,
                public damageDie: HitDice,
                public range: number,
                public attackMod?: number,
                public maxUses?: number) {
        if (maxUses != null) {
            this.currentUses = maxUses;
        }
    }
}