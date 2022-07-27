import { Box } from "@mui/system";
var styles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "55px"
};
export default function Form(_a) {
    var children = _a.children, onSubmit = _a.onSubmit;
    return (<Box sx={styles} component="form" onSubmit={onSubmit}>
      {children}
    </Box>);
}
