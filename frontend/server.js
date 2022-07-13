import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/dev", (req, res) => {
  res.render("index");
});

app.get("/", (req, res) => {
  res.render("index");
  // res.sendFile(path.join(__dirname + "/views/index.html"));
});
app.get("/ui", async (req, res) => {
  try {
    const response = await fetch("http://localhost:9000/ui");
    const body = await response.json();
    res.send(body);
  } catch (error) {
    console.error("ERROR!", error);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`"Na Ponta da Lingua (frontend) running at ${PORT}`);
});
