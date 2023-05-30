const Musicians = require('../models/musician');

exports.getMusicians = async (req, res) => {
  try {
    const { instrument } = req.query;
    const query = {};

    if (instrument && instrument !== 'none') {
      query.instrument = instrument.toLowerCase();
    }

    const musicians = await Musicians.find(query).sort('instrument');

    if (musicians.length === 0) {
      return res.json({ success: true, musicians: [] });
    }

    res.json({ success: true, musicians });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the bands.',
    });
  }
};
