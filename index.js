const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Function to fetch a random Bible verse
const fetchRandomBibleVerse = async () => {
  try {
    const response = await axios.get('https://labs.bible.org/api/?passage=random&type=json');
    return response.data;
  } catch (error) {
    console.error('Error fetching random Bible verse:', error);
    return { error: 'Could not fetch random Bible verse at this time.' };
  }
};

// Root endpoint to show a random Bible verse
app.get('/', async (req, res) => {
  const bibleVerse = await fetchRandomBibleVerse();
  res.json(bibleVerse);
});

// Endpoint to get a random Bible verse
app.get('/verse', async (req, res) => {
  const bibleVerse = await fetchRandomBibleVerse();
  res.json(bibleVerse);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
