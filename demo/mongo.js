import { app, shopify, session, PORT } from "./config.js";
import { client, dbName, collectName } from "./dbConnect.js";
// Connect MongoDB

app.get("/", async (req, res) => {
  let result = await client.connect();
  let db = result.db(dbName);
  let collection = db.collection(collectName);
  let data = await collection.insertOne({
    id: 8666049282340,
    title: "Burton Step On",
    body_html: `<strong>Step On® bindings are ONLY compatible with Step On® boots. Reference sizing chart to ensure accurate size match.</strong>`,
    vendor: "Snowboard",
    product_type: "Snowboard",
    created_at: "2023-12-20T05:39:18-05:00",
    handle: "snowboard",
    updated_at: "",
    published_at: "2023-12-20T05:39:18-05:00",
    template_suffix: "",
    published_scope: "web",
    tags: "snowboard",
    status: "draft",
  });
  if (data.acknowledged) {
    console.warn("data is inserted");
  }
  res.send(data);
});
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
