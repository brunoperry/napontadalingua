import express from "express";

const URL = "http://localhost:9000";
let siteData = null;
try {
  let res = await fetch(`${URL}/data`);
  siteData = await res.json();

  siteData.images.forEach((obj) => (obj.component = `./${obj.component}.ejs`));
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`"Na Ponta da Lingua (frontend) running at ${PORT}`);
});
