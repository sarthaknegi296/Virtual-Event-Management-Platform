require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const routes = require("./routes/routes");

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error", err));

app.use(express.json()); 

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is starting at port ${PORT}`);
});
