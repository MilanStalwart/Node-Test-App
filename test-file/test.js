const express = require('express');
require('dotenv').config();

const app = express();
const port = 80;

app.get("/", (req, res) => {
    res.write(process.env.SHOPIFY_API_KEY);
    res.write(process.env.SHOPIFY_AP_SECRET);
    res.write(process.env.STOREFRONT_ACCESS_TOKEN);
    res.write(process.env.STORE_URL);
    res.write(process.env.HOST_NAME);
    res.send("data Fetched");
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));