import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import express from "express";
const app = express();
app.set('view engine', 'ejs');
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));


const shopify = shopifyApi({
  apiKey: "API_KEY",
  apiSecretKey: "API_SECRETE_KEY",
  hostName: "NGROK_URL",
  adminApiAccessToken: "PRIVATE_APP_ACCESS_TOKEN",
  isCustomStoreApp: true,
  restResources,
});

const session = shopify.session.customAppSession("milan-r-dev.myshopify.com");


app.get("/", (req,res) => {
  res.render('productForm')
})

app.post("/submitForm", async (req, res) => {
  const { title,body_html, vendor, product_type, product_status, img_src  } = req.body;
  res.send({ title,body_html, vendor, product_type, product_status, img_src  })
  const product = new shopify.rest.Product({session: session});
  product.title = title;
  product.body_html = body_html;
  product.vendor = vendor;
  product.product_type = product_type;
  product.images = [
    {
      "src": img_src
    }
  ];
  product.status = product_status;
  await product.save({
    update: true,
  });
});

app.listen(80, () => console.log("Server is listening on port 80"))