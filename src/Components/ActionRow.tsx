import "./ActionRow.css";
import {Action} from "../Models.tsx";

export default function ActionRow({action, pb}: {action: Action, pb: number}) {
    const Uses = function({action}: {action: Action}) {
        if (action.maxUses == null) {
            return null;
        }
        const uses = [];
        for (let i = 0; i < action.maxUses; i++) {
            uses.push(<input key={i} type="checkbox" defaultChecked={i <= action.currentUses}/>)
        }

        return (
          <div>
              {uses}
          </div>
        );
    };

    return (
        <div className="action-row">
            <div className="action-row-group">
                <label>{action.name}</label>
                <Uses action={action}/>
            </div>
            <div className="action-row-group" style={{justifyContent:"space-between"}}>
                <label className="range">{action.range}</label>
                {action.attackMod != null && <label className="attack-bonus">+{action.attackMod}</label>}
                <label className="damage">{action.damageDiceCount}{action.damageDie}+{pb}</label>
            </div>
        </div>
    );
}