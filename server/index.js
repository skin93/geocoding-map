const express = require("express");
const cors = require("cors");
const axios = require("axios");
const searchRoutes = require("./routes/searchRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use("/api/search", searchRoutes);

app.get("/api/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.API_KEY}`
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(`${__dirname}/public`));
}

app.listen(PORT, () => {
  console.log(`App has started on port: ${PORT}`);
});
