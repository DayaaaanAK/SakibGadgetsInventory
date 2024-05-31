require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

const adminRoutes = require("./src/routes/admin.routes");
const productRoutes = require("./src/routes/product.routes");
const customerRoutes = require("./src/routes/customer.routes");
const orderRoutes = require("./src/routes/order.routes");
const viewRoutes = require("./src/routes/views.route");

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
require("./src/config/passport");

app.use("/admin", adminRoutes);
app.use("/product", productRoutes);
app.use("/customer", customerRoutes);
app.use("/order", orderRoutes);
app.use("/", viewRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
