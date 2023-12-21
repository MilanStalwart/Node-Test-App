import { app, shopify, session, PORT, express } from "../config.js";
import { client, dbName, collectName } from "../dbConnect.js";

// File Path
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", join(__dirname, "../views"));

var products = await shopify.rest.Product.all({
  session: session,
});

app.get("/", (req, res) => {
  res.render("routesInfo");
});
app.get("/fetch", (req, res) => {
  res.send(products);
});
app.get("/insert", async (req, res) => {
  let answer = req.query.ans;

  console.log(answer);
  if (answer == "yes") {
    let prodResult = products.data;
    let connect = await client.connect();
    let db = connect.db(dbName);
    let collection = db.collection(collectName);

    let InstertedData = await collection.insertMany(prodResult);
    if (InstertedData.acknowledged) {
      console.warn("InstertedData is inserted");
    }
    res.type("application/json").status(200).send(`<h1>Data Inserted</h1> \n ${InstertedData}`);
  } else if (answer == "") {
    res.type("text/HTML").send( `<h1 style="color: red;">Please write answer <code>YES</code> or <code>NO</code>.</h1>` );
  } else if (answer == undefined) {
    res.type("text/HTML").send(`<h1 style="color: red;text-align: center">Please write query YES or NO. &nbsp; Like this <code style="color:#000;">/?ans=your Answer</code></h1>`);
  } else {
    res.type("text/HTML").send(`<h1 style="color: red;">"${answer}" not acceptable for inserting data.</h1>`);
  }
});

app.get("/update", async (req, res) => {
  res.render('updateData');

  // let connect = await client.connect();
  // let db = connect.db(dbName);
  // let collection = db.collection(collectName);
  // let updatedData = await collection.updateMany(
  //   {
  //     key: value,
  //   },
  //   {
  //     $set: { template_suffix: null },
  //   }
  // );
  // if (updatedData.acknowledged) {
  //   console.warn("updatedData is inserted");
  // }
  // res.send(updatedData);
});
let  formData;
app.post('/submit', (req, res) => {
  // formData = {
  //   find_key: req.body.find_key,
  //   find_value: req.body.find_value,
  //   update_key: req.body.update_key,
  //   update_value: req.body.update_value
  // };
  console.log(req)
  res.redirect('/update');
});

app.listen(PORT, () => console.log(`Now Listning ${PORT}`));
