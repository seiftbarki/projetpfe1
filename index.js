//  all modules

const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI
//  middlewares
app.use(express.json());
app.use('/api/auth',require("./routes"));
app.use("/api/users", require("./routes/profile"));
app.use("/api/Post", require("./routes/post"));


// database
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("err"));

// server

app.listen(PORT, () => console.log(`SERVEUR STARTED ON PORT ${PORT}`));
