const express = require("express");
const methodOverride = require('method-override')

require("dotenv").config();

const databse = require("./config/database");

const systemConfig = require("./config/system");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

databse.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))

app.set("views", "./views");
app.set("view engine", "pug");

// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

// Route
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
