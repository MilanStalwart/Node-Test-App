require("dotenv").config();
const express = require("express");
const Shopify = require("shopify-node-api");

const app = express();

const shopify = new Shopify({
  shop: process.env.SHOP,
  shopify_api_key: process.env.SHOPIFY_API_KEY,
  shopify_shared_secret: process.env.SHOPIFY_SECRET_KEY,
  access_token: process.env.STOREFRONT_ACCESS_TOKEN,
  shopify_scope: "write_products",
  redirect_uri: "https://481f-2401-4900-1c80-28ee-b5bc-6a5b-8a8-b327.ngrok-free.app",
  nonce: "",
});

app.get('/', (req, res) => {
  let param = {limit: 5}
  shopify.get('/admin/products.json', param,(err, data) => {
    res.send(data.products);
  });
  console.log(res.data)
});

app.listen(80, () => console.log("Server is listening on port 80"));