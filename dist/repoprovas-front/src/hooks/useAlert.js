import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";
export default function useAlert() {
    var alertContext = useContext(AlertContext);
    if (!alertContext) {
        throw new Error("useAlert must be used inside a AlertContext Provider");
    }
    return alertContext;
}
