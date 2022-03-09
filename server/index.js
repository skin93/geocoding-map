const express = require("express");
const cors = require("cors");
const searchRoutes = require("./routes/searchRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use("/api/search", searchRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(`${__dirname}/public`));
}

app.listen(PORT, () => {
  console.log(`App has started on port: ${PORT}`);
});
