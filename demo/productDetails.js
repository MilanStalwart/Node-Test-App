import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import express from "express";
const app = express();
app.set('view engine', 'ejs');

const shopify = shopifyApi({
  apiKey: "564787232f953504bf617e4975ff5fc6",
  apiSecretKey: "53076a6fbaa0eaf81e75f738eb0a557f",
  hostName: "192d-2401-4900-1c80-28ee-1493-177-5918-395.ngrok-free.app",
  adminApiAccessToken: "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",
  isCustomStoreApp: true,
  restResources,
});

const session = shopify.session.customAppSession("milan-r-dev.myshopify.com");

const pageSize = 3;
let result = [];
var products = await shopify.rest.Product.all({
  session: session,
});
result = result.concat(products.data);

function paginateArray(array, pageSize) {
  return array.reduce((accumulator, currentValue, index) => {
    const pageIndex = Math.floor(index / pageSize);
    if (!accumulator[pageIndex]) {
      accumulator[pageIndex] = [];
    }
    accumulator[pageIndex].push(currentValue);
    return accumulator;
  }, []);
}
let pageNumber = 0;
app.get("/", async (req, res) => {
   pageNumber = req.query.page || 1;
  const paginatedData = paginateArray(result, pageSize);
  res.render('productTable', { paginatedData, currentPage: parseInt(pageNumber), totalPages: paginatedData.length });
});


app.get("/products", async (req, res) => {  
  let productId = req.query.id;
  if(productId != undefined){
    var viewProduct = await shopify.rest.Product.find({
      session: session,
      id: parseInt(productId),
    });
    var finalProd = JSON.stringify(viewProduct)
    let product = JSON.parse(finalProd) 
    res.render('productDetails', {product, pageNumber});
  }else{
    res.status(404).send("<h1>Error 404 - Product Doesn't exist</h1>")
  }
});

app.listen(80, () => console.log("Server is listening on port 80"));