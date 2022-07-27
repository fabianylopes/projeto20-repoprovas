import { createContext, useState } from "react";
export var AuthContext = createContext(null);
var LOCAL_STORAGE_KEY = "repoprovas-token";
var persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);
export function AuthProvider(_a) {
    var children = _a.children;
    var _b = useState(persistedToken), token = _b[0], setToken = _b[1];
    function signIn(token) {
        setToken(token);
        localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }
    function signOut() {
        setToken(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    return (<AuthContext.Provider value={{ token: token, signIn: signIn, signOut: signOut }}>
      {children}
    </AuthContext.Provider>);
}
