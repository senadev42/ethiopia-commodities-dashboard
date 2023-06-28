const express = require("express");
const cors = require("cors");
const request = require("request");
const cheerio = require("cheerio");

const app = express();
app.use(cors()); // Enable CORS

app.get("/", (req, res) => {
  const url = "https://market.nbebank.com/market/commodityprice/index.php";

  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);

      const tableRows = $("table tr");
      const tableData = [];

      // Loop through each table row
      for (let i = 2; i < tableRows.length; i++) {
        const tableCells = $(tableRows[i]).find("td");
        const rowData = {};

        // Loop through each table cell in the row
        for (let j = 1; j < tableCells.length - 1; j++) {
          const cellData = $(tableCells[j]).text().trim();
          rowData[`col${j}`] = cellData;
        }

        tableData.push(rowData);
      }

      res.send(tableData);
    } else {
      console.log("Error:", error);
      res.status(500).send("Internal server error");
    }
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
