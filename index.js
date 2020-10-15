const express = require("express");
const path = require('path');
const app = express();
const graphqlJson = require("./data/graphql.json");

const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.static('public'));

app.get("/:platform/prefetch", (req, res) => {
  const prefetchJson = require("./data/prefetch.json");
  res.json(prefetchJson);
});

app.post("/graphql/v1", (req, res) => {
  res.status(200).json({ results: [] });
});

app.post("/graphql/v2", (req, res) => {
  res.json(graphqlJson);
});

app.get("/android/v2/updateInfo", (req, res) => {
  res.status(500);
});

app.get("/ios/updateinfo", (req, res) => {
  res.status(500);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/data/index.html'))
});

app.listen(PORT, () => {
  console.log(`Server run in ${PORT}`);
});
