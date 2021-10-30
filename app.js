const express = require('express');
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const urlGulp = "https://gulf.ge/";
  try {
    const arr = [];
    const {data} = await axios(urlGulp);
    const $ = cheerio.load(data);
    $(".price_entry", data).each(function () {
      const title = $(this).find(".product_name").text();
      const price = $(this).find(".product_price").text();
      arr.push({
        title: title,
        price: price
      });
    });
    res.status(200).json({
      gulp: arr,
    });
  } catch (error) {
    res.status(500).json({
      message: `Change of information website ${urlGulp}`
    });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

