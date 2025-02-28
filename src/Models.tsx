export enum AbilityScores {
    STR = "STR",
    DEX = "DEX",
    CON = "CON",
    INT = "INT",
    WIS = "WIS",
    CHA = "CHA"
}

export enum HitDice {
    d4 = "d4",
    d8 = "d8"
}

export enum DamageType {
    Force,
    Healing
}

export class Minion {
    public proficiencyBonus: number = 0;
    public name: string = "";
    public abilityScores: {
         STR: AbilityScore,
         DEX: AbilityScore,
         CON: AbilityScore,
         INT: AbilityScore,
         WIS: AbilityScore,
         CHA: AbilityScore,
    } = {
        STR: new AbilityScore(0, false),
        DEX: new AbilityScore(0, false),
        CON: new AbilityScore(0, false),
        INT: new AbilityScore(0, false),
        WIS: new AbilityScore(0, false),
        CHA: new AbilityScore(0, false),
    };
    public hpMax: number = 0;
    public hpCurrent: number = 0;
    public hpTemp: number = 0;
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
    public isBlessed: boolean = false;
    public isEnlarged: boolean = false;

    private static computeProficiencyBonus(artificerLevel: number) {
        return 1 + Math.ceil(artificerLevel / 4);
    }

    public static createSteelDefender(artificerLevel: number, artificerIntMod: number) : Minion {
        let pb = this.computeProficiencyBonus(artificerLevel);
        let hpMax = 2 + artificerIntMod + (5 * artificerLevel);
        let sd = new Minion();

        sd.name = "Steel Defender";
        sd.proficiencyBonus = pb;
        sd.abilityScores = {
            STR: new AbilityScore(2, false),
            DEX: new AbilityScore(1, true),
            CON: new AbilityScore(2, true),
            INT: new AbilityScore(-3, false),
            WIS: new AbilityScore(0, false),
            CHA: new AbilityScore(-2, false),
        }
        sd.hpMax = hpMax;
        sd.hpCurrent = hpMax;
        sd.hitDie = HitDice.d8;
        sd.hitDiceMax = artificerLevel;
        sd.hitDiceCurrent = artificerLevel;
        sd.ac = 15;
        sd.speed = 40;
        sd.proficiencies = [
            new Proficiency("Athletics", 2 + pb),
            new Proficiency("Perception", 2 * pb)
        ];
        sd.conditionImmunities = [
            "Charmed",
            "Exhaustion",
            "Poisoned"
        ];
        sd.passives = [
            new Feature("Vigilant", "The defender can't be surprised")
        ];
        sd.actions = [
            new Action("Force-Empowered Rend", 1, HitDice.d8, DamageType.Force, 5, artificerIntMod + pb),
            new Action("Repair", 2, HitDice.d8, DamageType.Healing, 5, undefined, 3)
        ];
        sd.reactions = [
            new Feature("Deflect Attack", "Imposes disadvantage to one attack roll on one other creature it can see within 5ft")
        ];

        return sd;
    }

    public static createHomunculusServant(artificerLevel : number) : Minion {
        let pb = this.computeProficiencyBonus(artificerLevel);
        let hs = new Minion();
        hs.name = "Homunculus Servant";
        hs.proficiencyBonus = pb;
        hs.abilityScores = {
            STR: new AbilityScore(-3, false),
            DEX: new AbilityScore(2, true),
            CON: new AbilityScore(1, false),
            INT: new AbilityScore(0, false),
            WIS: new AbilityScore(0, false),
            CHA: new AbilityScore(-2, false),
        }
        hs.hpMax = 10;
        hs.hpCurrent = 10;
        hs.hitDie = HitDice.d4;
        hs.hitDiceMax = 1;
        hs.hitDiceCurrent = 1;
        hs.ac = 13;
        hs.speed = 30;
        hs.proficiencies = [
            new Proficiency("Stealth", 2 + pb),
            new Proficiency("Perception", 2 + pb)
        ];
        hs.conditionImmunities = [
            "Exhaustion",
            "Poisoned"
        ];
        hs.passives = [
            new Feature("Evasion", "Dex save - success = no damage, failure = ½ damage")
        ];
        hs.actions = [
            new Action("Force Strike", 1, HitDice.d4, DamageType.Force, 30, 2 + pb, undefined)
        ];
        hs.reactions = [
            new Feature("Channel Magic", "Delivers a spell with a range of touch that you cast (while within 120ft of you)")
        ]

        return hs;
    }
}

export class AbilityScore {
    constructor(public bonus: number, public isProficient: boolean) {
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
    public currentUses: number = 0;
    constructor(public name: string,
                public damageDiceCount: number,
                public damageDie: HitDice,
                public damageType: DamageType,
                public range: number,
                public attackMod?: number,
                public maxUses?: number) {
        if (maxUses != null) {
            this.currentUses = maxUses;
        }
    }
}