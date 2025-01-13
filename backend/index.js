const express = require("express");
const app = express();
const cors = require("cors");
const TaskRouter = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");
const registerRoute = require("./Routes/registerRoute");
const loginRoute = require("./Routes/loginRoute");
const PORT = process.env.PORT || 8080;
require("dotenv").config();
require("./Models/db");

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use(cors());
app.use(bodyParser.json());

app.use("/tasks", TaskRouter);
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT=${PORT}`);
});
