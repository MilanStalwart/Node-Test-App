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
  redirect_uri: process.env.HOST_NAME,
  nonce: "",
});

var put_data = {
  product: {
    body_html: "<strong>DONE</strong>",
  },
};

app.get("/", (req, res) => {
  shopify.put("/admin/products/8983441801508.json",put_data,(err, data, headers) => {
    console.log(data);
  });
  console.log(res.data)
});

app.listen(80, () => console.log("Server is listening on port 80"));
