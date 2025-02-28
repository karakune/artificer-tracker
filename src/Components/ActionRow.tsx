import "./ActionRow.css";
import {Action, DamageType, HitDice} from "../Models.tsx";
import damageIcon from "../assets/DamageIcon.png";

export default function ActionRow({action, pb, isBlessed, isEnlarged, onUsesChanged}: {action: Action, pb: number, isBlessed: boolean, isEnlarged: boolean, onUsesChanged: (value: boolean) => void}) {
    const Uses = function({action}: {action: Action}) {
        if (action.maxUses == null) {
            return null;
        }
        const uses = [];
        for (let i = 0; i < action.maxUses; i++) {
            uses.push(<input key={i} type="checkbox"
                             onChange={(e) => onUsesChanged(e.target.checked)}
                             defaultChecked={action.currentUses < action.maxUses - i}/>)
        }

        return (
          <div>
              {uses}
          </div>
        );
    };

    function computeDamageDisplay() {
        let damageText;
        if (!isEnlarged) {
            damageText = action.damageDiceCount + action.damageDie + "+" + pb;
        } else if (action.damageDie === HitDice.d4) {
            damageText = (action.damageDiceCount + 1) + action.damageDie + "+" + pb;
        } else {
            damageText = "1d4+" + action.damageDiceCount + action.damageDie + "+" + pb;
        }

        let icon;
        switch (action.damageType) {
            case DamageType.Force:
                icon = <img style={{height: "1em", verticalAlign:"middle"}} src={damageIcon} alt="dmg icon"/>;
                break;
            case DamageType.Healing:
                icon = "♥";
                break;
            default:
                icon = "";
                break;
        }

        return (
            <span className="damage">{damageText} {icon}</span>
        );
    }

    return (
        <div className="action-row">
            <div className="action-row-group">
                <label>{action.name}</label>
                <Uses action={action}/>
            </div>
            <div className="action-row-group" style={{justifyContent:"space-between"}}>
                <label className="range">{action.range}</label>
                {action.attackMod != null && <label className="attack-bonus">{isBlessed ? "1d4" : ""}+{action.attackMod}</label>}
                {computeDamageDisplay()}
            </div>
        </div>
    );
}