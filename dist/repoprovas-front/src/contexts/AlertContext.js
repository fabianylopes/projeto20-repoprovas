import { createContext, useState } from "react";
export var AlertContext = createContext(null);
export function AlertProvider(_a) {
    var children = _a.children;
    var _b = useState(null), message = _b[0], setMessage = _b[1];
    function handleClose() {
        setMessage(null);
    }
    return (<AlertContext.Provider value={{ message: message, setMessage: setMessage, handleClose: handleClose }}>
      {children}
    </AlertContext.Provider>);
}
