import "./ActionRow.css";
import {Action, HitDice} from "../Models.tsx";

export default function ActionRow({action, pb, isBlessed, isEnlarged}: {action: Action, pb: number, isBlessed: boolean, isEnlarged: boolean}) {
    const Uses = function({action}: {action: Action}) {
        if (action.maxUses == null) {
            return null;
        }
        const uses = [];
        for (let i = 0; i < action.maxUses; i++) {
            uses.push(<input key={i} type="checkbox" defaultChecked={i > action.currentUses}/>)
        }

        return (
          <div>
              {uses}
          </div>
        );
    };

    function computeDamageDisplay(): string {
        if (!isEnlarged) {
            return action.damageDiceCount + action.damageDie + "+" + pb;
        } else if (action.damageDie === HitDice.d4) {
            return (action.damageDiceCount + 1) + action.damageDie + "+" + pb;
        } else {
            return "1d4+" + action.damageDiceCount + action.damageDie + "+" + pb;
        }
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
                <label className="damage">{computeDamageDisplay()}</label>
            </div>
        </div>
    );
}