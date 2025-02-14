import React from "react";
import ReactDOM from "react-dom/client";
import Preloader from "./Components/Preloader.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Preloader/>
    </React.StrictMode>,
);
