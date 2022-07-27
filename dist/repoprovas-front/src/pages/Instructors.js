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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Link, TextField, Typography, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
function Instructors() {
    var navigate = useNavigate();
    var token = useAuth().token;
    var _a = useState([]), teachersDisciplines = _a[0], setTeachersDisciplines = _a[1];
    var _b = useState([]), categories = _b[0], setCategories = _b[1];
    useEffect(function () {
        function loadPage() {
            return __awaiter(this, void 0, void 0, function () {
                var testsData, categoriesData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!token)
                                return [2 /*return*/];
                            return [4 /*yield*/, api.getTestsByTeacher(token)];
                        case 1:
                            testsData = (_a.sent()).data;
                            setTeachersDisciplines(testsData.tests);
                            return [4 /*yield*/, api.getCategories(token)];
                        case 2:
                            categoriesData = (_a.sent()).data;
                            setCategories(categoriesData.categories);
                            return [2 /*return*/];
                    }
                });
            });
        }
        loadPage();
    }, [token]);
    return (<>
      <TextField sx={{ marginX: "auto", marginBottom: "25px", width: "450px" }} label="Pesquise por pessoa instrutora"/>
      <Divider sx={{ marginBottom: "35px" }}/>
      <Box sx={{
            marginX: "auto",
            width: "700px"
        }}>
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap"
        }}>
          <Button variant="outlined" onClick={function () { return navigate("/app/disciplinas"); }}>
            Disciplinas
          </Button>
          <Button variant="contained" onClick={function () { return navigate("/app/pessoas-instrutoras"); }}>
            Pessoa Instrutora
          </Button>
          <Button variant="outlined" onClick={function () { return navigate("/app/adicionar"); }}>
            Adicionar
          </Button>
        </Box>
        <TeachersDisciplinesAccordions categories={categories} teachersDisciplines={teachersDisciplines}/>
      </Box>
    </>);
}
function TeachersDisciplinesAccordions(_a) {
    var categories = _a.categories, teachersDisciplines = _a.teachersDisciplines;
    var teachers = getUniqueTeachers(teachersDisciplines);
    return (<Box sx={{ marginTop: "50px" }}>
      {teachers.map(function (teacher) { return (<Accordion sx={{ backgroundColor: "#FFF" }} key={teacher}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{teacher}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {categories
                .filter(doesCategoryHaveTests(teacher, teachersDisciplines))
                .map(function (category) { return (<Categories key={category.id} category={category} teacher={teacher} teachersDisciplines={teachersDisciplines}/>); })}
          </AccordionDetails>
        </Accordion>); })}
    </Box>);
}
function getUniqueTeachers(teachersDisciplines) {
    return __spreadArray([], new Set(teachersDisciplines.map(function (teacherDiscipline) { return teacherDiscipline.teacher.name; })), true);
}
function doesCategoryHaveTests(teacher, teachersDisciplines) {
    return function (category) {
        return teachersDisciplines.filter(function (teacherDiscipline) {
            return teacherDiscipline.teacher.name === teacher &&
                testOfThisCategory(teacherDiscipline, category);
        }).length > 0;
    };
}
function testOfThisCategory(teacherDiscipline, category) {
    return teacherDiscipline.tests.some(function (test) { return test.category.id === category.id; });
}
function Categories(_a) {
    var category = _a.category, teachersDisciplines = _a.teachersDisciplines, teacher = _a.teacher;
    return (<>
      <Box sx={{ marginBottom: "8px" }}>
        <Typography fontWeight="bold">{category.name}</Typography>
        {teachersDisciplines
            .filter(function (teacherDiscipline) { return teacherDiscipline.teacher.name === teacher; })
            .map(function (teacherDiscipline) { return (<Tests key={teacherDiscipline.id} tests={teacherDiscipline.tests.filter(function (test) { return test.category.id === category.id; })} disciplineName={teacherDiscipline.discipline.name}/>); })}
      </Box>
    </>);
}
function Tests(_a) {
    var tests = _a.tests, disciplineName = _a.disciplineName;
    return (<>
      {tests.map(function (test) { return (<Typography key={test.id} color="#878787">
          <Link href={test.pdfUrl} target="_blank" underline="none" color="inherit">{"".concat(test.name, " (").concat(disciplineName, ")")}</Link>
        </Typography>); })}
    </>);
}
export default Instructors;
