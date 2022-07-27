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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Link, TextField, Typography, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
function Disciplines() {
    var navigate = useNavigate();
    var token = useAuth().token;
    var _a = useState([]), terms = _a[0], setTerms = _a[1];
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
                            return [4 /*yield*/, api.getTestsByDiscipline(token)];
                        case 1:
                            testsData = (_a.sent()).data;
                            setTerms(testsData.tests);
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
      <TextField sx={{ marginX: "auto", marginBottom: "25px", width: "450px" }} label="Pesquise por disciplina"/>
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
          <Button variant="contained" onClick={function () { return navigate("/app/disciplinas"); }}>
            Disciplinas
          </Button>
          <Button variant="outlined" onClick={function () { return navigate("/app/pessoas-instrutoras"); }}>
            Pessoa Instrutora
          </Button>
          <Button variant="outlined" onClick={function () { return navigate("/app/adicionar"); }}>
            Adicionar
          </Button>
        </Box>
        <TermsAccordions categories={categories} terms={terms}/>
      </Box>
    </>);
}
function TermsAccordions(_a) {
    var categories = _a.categories, terms = _a.terms;
    return (<Box sx={{ marginTop: "50px" }}>
      {terms.map(function (term) { return (<Accordion sx={{ backgroundColor: "#FFF" }} key={term.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{term.number} Período</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DisciplinesAccordions categories={categories} disciplines={term.disciplines}/>
          </AccordionDetails>
        </Accordion>); })}
    </Box>);
}
function DisciplinesAccordions(_a) {
    var categories = _a.categories, disciplines = _a.disciplines;
    if (disciplines.length === 0)
        return <Typography>Nenhuma prova para esse período...</Typography>;
    return (<>
      {disciplines.map(function (discipline) { return (<Accordion sx={{ backgroundColor: "#FFF", boxShadow: "none" }} key={discipline.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{discipline.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Categories categories={categories} teachersDisciplines={discipline.teacherDisciplines}/>
          </AccordionDetails>
        </Accordion>); })}
    </>);
}
function Categories(_a) {
    var categories = _a.categories, teachersDisciplines = _a.teachersDisciplines;
    if (teachersDisciplines.length === 0)
        return <Typography>Nenhuma prova para essa disciplina...</Typography>;
    return (<>
      {categories
            .filter(doesCategoryHaveTests(teachersDisciplines))
            .map(function (category) { return (<Box key={category.id}>
            <Typography fontWeight="bold">{category.name}</Typography>
            <TeachersDisciplines teachersDisciplines={teachersDisciplines}/>
          </Box>); })}
    </>);
}
function doesCategoryHaveTests(teachersDisciplines) {
    return function (category) {
        return teachersDisciplines.filter(function (teacherDiscipline) {
            return testOfThisCategory(teacherDiscipline, category);
        }).length > 0;
    };
}
function testOfThisCategory(teacherDiscipline, category) {
    return teacherDiscipline.tests.some(function (test) { return test.category.id === category.id; });
}
function TeachersDisciplines(_a) {
    var teachersDisciplines = _a.teachersDisciplines;
    var testsWithDisciplines = teachersDisciplines.map(function (teacherDiscipline) { return ({
        tests: teacherDiscipline.tests,
        teacherName: teacherDiscipline.teacher.name
    }); });
    return <Tests testsWithTeachers={testsWithDisciplines}/>;
}
function Tests(_a) {
    var testsWithDisciplines = _a.testsWithTeachers;
    return (<>
      {testsWithDisciplines.map(function (testsWithDisciplines) {
            return testsWithDisciplines.tests.map(function (test) { return (<Typography key={test.id} color="#878787">
            <Link href={test.pdfUrl} target="_blank" underline="none" color="inherit">{"".concat(test.name, " (").concat(testsWithDisciplines.teacherName, ")")}</Link>
          </Typography>); });
        })}
    </>);
}
export default Disciplines;
