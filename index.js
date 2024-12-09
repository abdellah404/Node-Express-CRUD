const express = require("express");
const app = express();
const routes = require("./routes/users.js");
const port = 5000;

app.use(express.json());
app.use("/user", routes);

app.listen(port, () => console.log("server is running at port", port));

