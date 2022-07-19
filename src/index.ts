import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

import handleErrorsMiddleware from "./middlewares/handleErrorsMiddleware.js";
import router from "./routers/index.js";

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(handleErrorsMiddleware);

const PORT = +process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(chalk.bold.redBright(`Server is up and runnig on port ${PORT}`));
});