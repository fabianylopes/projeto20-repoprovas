import { Box } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as SignOutIcon } from "../../assets/signout.svg";
import useAuth from "../../hooks/useAuth";
export function MainApp(_a) {
    var _b = _a.redirectPath, redirectPath = _b === void 0 ? "/login" : _b;
    var navigate = useNavigate();
    var _c = useAuth(), token = _c.token, signOut = _c.signOut;
    if (!token) {
        return <Navigate to={redirectPath} replace/>;
    }
    function handleSignOut() {
        navigate("/login");
        signOut();
    }
    return (<Box sx={{
            display: "flex",
            flexDirection: "column"
        }}>
      <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "50px"
        }}>
        <Logo />
        <SignOutIcon style={{ cursor: "pointer" }} onClick={handleSignOut}/>
      </Box>
      <Outlet />
    </Box>);
}
