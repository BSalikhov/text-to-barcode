const express = require("express");
const bwipjs = require("bwip-js");

function textToBarCodeBase64(text) {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: "code128",
        text: text,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: "center",
      },
      function (error, buffer) {
        if (error) {
          reject(error);
        } else {
          resolve(buffer);
        }
      }
    );
  });
}

const app = express();
const port = 3000;

app.get("/:content.png", async (req, res) => {
  const content = await textToBarCodeBase64(req.params.content);
  res.setHeader('content-type', 'image/png');
  res.send(content);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
