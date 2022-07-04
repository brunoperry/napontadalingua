import express from "express";
import NPDLRouter from "./routes/NPDLRouter.js";

const app = express();
//SETS
app.set("view engine", "ejs");

//USES
app.use(express.static("public"));

//ROUTES
app.use("/", NPDLRouter);

const port = 3000;
app.listen(port, () => {
  console.log("Na Ponta da Lingua running on port 3000");
});
