import { Alert as MUIAlert, Snackbar } from "@mui/material";
import useAlert from "../../hooks/useAlert";
export default function Alert() {
    var _a = useAlert(), message = _a.message, handleClose = _a.handleClose;
    return (<Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
      <MUIAlert onClose={handleClose} severity={(message === null || message === void 0 ? void 0 : message.type) || "error"} sx={{ width: "100%" }}>
        {message === null || message === void 0 ? void 0 : message.text}
      </MUIAlert>
    </Snackbar>);
}
