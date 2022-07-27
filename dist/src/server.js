import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
var PORT = +process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(chalk.bold.redBright("Server is up and runnig on port ".concat(PORT)));
});
