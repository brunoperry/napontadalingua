import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URL = "http://localhost:9000";
let siteData = null;
try {
  let res = await fetch(`${URL}/data`);
  siteData = await res.json();
} catch (error) {}

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/dev", (req, res) => {
  res.render("index");
});

app.get("/", (req, res) => {
  res.render("index", {
    data: siteData,
  });
});
// app.get("/ui", async (req, res) => {
//   try {
//     const response = await fetch(`${URL}/ui`);
//     const body = await response.json();
//     res.send(body);
//   } catch (error) {
//     console.error("ERROR!", error);
//   }
// });
// app.get("/images", async (req, res) => {
//   res.send(IMAGES);
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`"Na Ponta da Lingua (frontend) running at ${PORT}`);
});
