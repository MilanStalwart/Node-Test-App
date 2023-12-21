import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import express from "express";
const app = express();
app.set('view engine', 'ejs');

const shopify = shopifyApi({
  apiKey: "API_KEY",
  apiSecretKey: "API_SECRETE_KEY",
  hostName: "NGROK_URL",
  adminApiAccessToken: "PRIVATE_APP_ACCESS_TOKEN",
  isCustomStoreApp: true,
  restResources,
});

const session = shopify.session.customAppSession("milan-r-dev.myshopify.com");

let pageInfo;
const pageSize = 3;
let result = [];
var products = await shopify.rest.Product.all({
  session: session,
  ...pageInfo?.nextPage?.query,
  limit: 5,
});
result = result.concat(products.data);

let nextPageInfo = products.pageInfo?.nextPage?.query?.page_info;
while (nextPageInfo) {
  products = await shopify.rest.Product.all({
    session,
    page_info: nextPageInfo,
  });

  result = result.concat(products.data);
  nextPageInfo = products.pageInfo?.nextPage?.query?.page_info;
}
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
app.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const paginatedData = paginateArray(result, pageSize);

  res.render('pagination', { paginatedData, currentPage: parseInt(page), totalPages: paginatedData.length });
});

app.listen(80, () => console.log("Server is listening on port 80"));