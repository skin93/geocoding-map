const axios = require("axios");
const url = require("url");

// @desc Get places by query
// @route POST /api/search/:query
// @access Public
exports.getPlaces = async (req, res) => {
  try {
    const params = new URLSearchParams({
      access_token: process.env.API_KEY,
      ...url.parse(req.url, true).query,
    });
    const query = req.params.query;
    const results = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}}`
    );

    results.data.features.forEach((item) => {
      item.city = null;
      item.state = null;

      item.context.forEach((type) => {
        if (type.id.includes("place")) {
          item.city = type.text;
        }

        if (type.id.includes("region")) {
          item.state = type.text;
        }
      });
    });

    const data = results.data;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
