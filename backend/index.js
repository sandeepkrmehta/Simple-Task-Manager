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

const corsOptions = {
  origin: "https://simple-task-manager-dh7f.onrender.com", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,  // If you need to send cookies or session data
};


app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/tasks", TaskRouter);
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT=${PORT}`);
});
