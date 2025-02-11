import "./MenuContainer.css"

export default function MenuContainer({isVisible}: {isVisible: boolean}) {
    return (
        <div className={isVisible ? "slide-menu show" : "slide-menu hide"}>
            <div className="menu-zone">
                <div style={{display:"flex", flexFlow: "column", gap:"1vh", marginTop: "3vh"}}>
                    <button className="menu-button">Long Rest</button>
                    <button className="menu-button">Short Rest</button>
                </div>
                <button className="menu-button">Settings</button>
            </div>
        </div>
    )
}