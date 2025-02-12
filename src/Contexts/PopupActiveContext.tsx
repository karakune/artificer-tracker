import {createContext} from "react";

export const PopupActiveContext = createContext<any>({isPopupActive: false, setPopupActive: () => {}});