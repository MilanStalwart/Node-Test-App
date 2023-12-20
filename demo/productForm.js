import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import express from "express";
const app = express();
app.set('view engine', 'ejs');
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));


const shopify = shopifyApi({
  apiKey: "564787232f953504bf617e4975ff5fc6",
  apiSecretKey: "53076a6fbaa0eaf81e75f738eb0a557f",
  hostName: "https://ecfb-2401-4900-1c80-28ee-c95d-b391-385e-2103.ngrok-free.app/",
  adminApiAccessToken: "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",
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