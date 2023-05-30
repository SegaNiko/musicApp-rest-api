const Band = require('../models/band');

exports.getBands = async (req, res) => {
  try {
    const { musical_direction, name } = req.query;
    const query = {};

    if (musical_direction) {
      query.musical_direction = musical_direction.toLowerCase();
    }
    if (name) {
      query.name = name;
    }

    const bands = await Band.find(query).sort('musical_direction').sort('name');

    if (bands.length === 0) {
      return res.json({ success: true, bands: [] });
    }

    res.json({ success: true, bands });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the bands.',
    });
  }
};
