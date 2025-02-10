import "./ActionRow.css";

export default function ActionRow() {
    return (
        <div className="action-row">
            <label>Hammer of Mending</label>
            <div>
                <label className="range">20</label>
                <label className="range2"> (60)</label>
            </div>
            <label className="attack-bonus">+8</label>
            <label className="damage">1d4+5</label>
        </div>
    );
}