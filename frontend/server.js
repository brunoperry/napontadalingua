import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/ui", async (req, res) => {
  const response = await fetch("localhost:9000/ui");
  const body = await response.json();

  console.log(body);
  // const data = await fetch("localhost:9000/ui");
  // const json = await data.json();
  res.send(body);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`"Na Ponta da Lingua (frontend) running at ${PORT}`);
});
