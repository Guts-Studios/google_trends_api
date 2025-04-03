const express = require('express');
const googleTrends = require('google-trends-api');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Dynamic port for Render deployment

app.use(cors());
app.use(express.json());

app.post('/trends', async (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword required." });
  }

  try {
    const trendsData = await googleTrends.interestOverTime({
      keyword,
      startTime: new Date(Date.now() - (90 * 24 * 60 * 60 * 1000)), // last 90 days
      endTime: new Date(),
    });

    res.json(JSON.parse(trendsData));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server (Render-compatible)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
