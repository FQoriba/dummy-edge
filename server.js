const express = require("express");
// const bodyParser = require("body-parser");
// const bodyParserGraphQL = require("body-parser-graphql").bodyParserGraphQL;
// const compose = require("compose-middleware").compose;
const path = require('path');
const app = express();
const graphqlJson = require("./data/graphql.json");
const prefetchJson = require("./data/prefetch.json");

// const custommid = (bodyParserOpts = {}) =>
//   compose([
//     (req, res, next) => {
//       if (req.is("text/plain")) {
//         return bodyParser.text(bodyParserOpts)(req, req, next);
//       }
//       return bodyParser.json(bodyParserOpts)(req, req, next);
//     },
//     (req, res, next) => {
//       if (req.is("text/plain")) {
//         try {
//           req.body = JSON.parse(req.body);
//           return next();
//         } catch (e) {
//           return next(e);
//         }
//       }
//       return next();
//     },
//   ]);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/data/index.html'))
})

app.get("/android/prefetch", (req, res) => {
  res.json(prefetchJson);
});

app.get("/ios/prefetch", (req, res) => {
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
  res.json({
    updateInfo: {
      downloadURL:
        "https://s3-ap-southeast-1.amazonaws.com/salestock-versioner-bundles-prod/uploads/versions/ddbd2d22-7e19-486a-bbd5-75b49c4fd08e",
      isAvailable: true,
      isMandatory: false,
      appVersion: "0.4.0",
      packageHash:
        "e283d0c41c3233f6553d738eb276525cbbd6b7a6f8cc92a6619fd2f9712398f3",
      label: "39fbcec",
      updateAppVersion: false,
    },
  });
});

app.listen(3000);
