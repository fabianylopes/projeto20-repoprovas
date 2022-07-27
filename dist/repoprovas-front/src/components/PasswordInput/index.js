import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, } from "@mui/material";
import React, { useState } from "react";
function PasswordInput(_a) {
    var name = _a.name, sx = _a.sx, label = _a.label, value = _a.value, onChange = _a.onChange;
    var _b = useState(false), showPassword = _b[0], setShowPassword = _b[1];
    function handleIconClick() {
        setShowPassword(!showPassword);
    }
    return (<FormControl sx={sx} variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput id={name} name={name} type={showPassword ? "text" : "password"} value={value} onChange={onChange} endAdornment={<InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleIconClick} onMouseDown={handleIconClick} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>} label={label}/>
    </FormControl>);
}
export default PasswordInput;
