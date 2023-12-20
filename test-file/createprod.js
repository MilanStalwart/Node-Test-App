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

var post_data = {
  product: {
    title: "Burton Custom Freestlye 152",
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    images : [
      {
        "src": "https://fastly.picsum.photos/id/268/800/800.jpg?hmac=Ox1Y7M4Q8bAAeGTC5xntLY8lx0V9bthKRpkvrGjV89k"
      }
    ],
    variants: [
      {
        option1: "First",
        price: "10.00",
        sku: 123,
      },
      {
        option1: "Second",
        price: "20.00",
        sku: "123",
      },
    ],
  },
};

app.get("/", (req, res) => {
  shopify.post("/admin/products.json",post_data, (err, data, headers)=> {
    console.log(data);
  });
});

app.listen(80, () => console.log("Server is listening on port 80"));