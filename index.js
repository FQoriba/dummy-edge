const fs = require("fs");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const prefetchJson = require("./data/prefetch.json");
const graphqlJson = require("./data/graphql.json");

const PORT = parseInt(process.env.PORT || "3000", 10);

const app = express();
const indexHtml = fs.readFileSync(path.join(__dirname, "/data/index.html"), {encoding: "utf-8"});
const faqHtml = fs.readFileSync(path.join(__dirname, "/data/faq.html"), {encoding: "utf-8"});

app.use(helmet({
  frameguard: {
    action: "deny",
  },
  contentSecurityPolicy: false,
}));

app.use(express.static("public"));

app.post("/graphql/v1", (_, res) => {
  res.status(200).json({ results: [] });
});

app.post("/graphql/v2", (_, res) => {
  res.json(graphqlJson);
});

app.get("/:platform/prefetch", (_, res) => {
  res.json(prefetchJson);
});

app.get("/android/v2/updateInfo", (_, res) => {
  res.status(500);
});

app.get("/ios/updateinfo", (_, res) => {
  res.status(500);
});

app.get("/faq", (_, res) => {
  res.send(faqHtml);
});

app.get("*", (_, res) => {
  res.send(indexHtml);
});

app.listen(PORT, () => {
  console.log(`Server run in ${PORT}`);
});
