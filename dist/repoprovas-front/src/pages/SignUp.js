var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Box, Button, Divider, Link, TextField, Typography, } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Form from "../components/Form";
import PasswordInput from "../components/PasswordInput";
import useAlert from "../hooks/useAlert";
import api from "../services/api";
var styles = {
    container: {
        marginTop: "180px",
        width: "460px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center"
    },
    title: { marginBottom: "30px" },
    dividerContainer: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "16px",
        marginBottom: "26px"
    },
    input: { marginBottom: "16px" },
    actionsContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
};
function SignUp() {
    var setMessage = useAlert().setMessage;
    var navigate = useNavigate();
    var _a = useState({
        email: "",
        password: "",
        passwordConfirmation: ""
    }), formData = _a[0], setFormData = _a[1];
    function handleInputChange(e) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    }
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, passwordConfirmation, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        setMessage(null);
                        if (!(formData === null || formData === void 0 ? void 0 : formData.email) ||
                            !(formData === null || formData === void 0 ? void 0 : formData.password) ||
                            !(formData === null || formData === void 0 ? void 0 : formData.passwordConfirmation)) {
                            setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
                            return [2 /*return*/];
                        }
                        email = formData.email, password = formData.password, passwordConfirmation = formData.passwordConfirmation;
                        if (password !== passwordConfirmation) {
                            setMessage({ type: "error", text: "As senhas devem ser iguais!" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api.signUp({ email: email, password: password })];
                    case 2:
                        _a.sent();
                        setMessage({ type: "success", text: "Cadastro efetuado com sucesso!" });
                        navigate("/login");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.response) {
                            setMessage({
                                type: "error",
                                text: error_1.response.data
                            });
                            return [2 /*return*/];
                        }
                        setMessage({
                            type: "error",
                            text: "Erro, tente novamente em alguns segundos!"
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return (<Form onSubmit={handleSubmit}>
      <Logo />
      <Box sx={styles.container}>
        <Typography sx={styles.title} variant="h4" component="h1">
          Cadastro
        </Typography>
        <Button variant="contained" color="secondary">
          Entrar com Github
        </Button>
        <Box sx={styles.dividerContainer}>
          <Divider sx={{ flex: "1" }}/>
          <Typography variant="caption" component="span">
            ou
          </Typography>
          <Divider sx={{ flex: "1" }}/>
        </Box>
        <TextField name="email" sx={styles.input} label="Email" type="email" variant="outlined" onChange={handleInputChange} value={formData.email}/>
        <PasswordInput name="password" sx={styles.input} label="Senha" onChange={handleInputChange} value={formData.password}/>
        <PasswordInput name="passwordConfirmation" sx={styles.input} label="Confirme sua senha" onChange={handleInputChange} value={formData.passwordConfirmation}/>
        <Box sx={styles.actionsContainer}>
          <Link component={RouterLink} to="/login">
            <Typography>Já possuo cadastro</Typography>
          </Link>
          <Button variant="contained" type="submit">
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Form>);
}
export default SignUp;
