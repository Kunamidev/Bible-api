const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Function to fetch a random Bible verse and format it
const fetchRandomBibleVerse = async () => {
  try {
    const response = await axios.get('https://labs.bible.org/api/?passage=random&type=json');
    const verseData = response.data[0];
    
    return {
      reference: `${verseData.bookname} ${verseData.chapter}:${verseData.verse}`,
      verse: verseData.text
    };
  } catch (error) {
    console.error('Error fetching random Bible verse:', error);
    throw new Error('Could not fetch random Bible verse at this time.');
  }
};

// Middleware to handle JSON response and errors
app.use(express.json());

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    next();
  }
});

// Root endpoint to show a random Bible verse
app.get('/', async (req, res, next) => {
  try {
    const bibleVerse = await fetchRandomBibleVerse();
    res.json(bibleVerse);
  } catch (error) {
    next(error);
  }
});

// Endpoint to get a random Bible verse
app.get('/api/verse', async (req, res, next) => {
  try {
    const bibleVerse = await fetchRandomBibleVerse();
    res.json(bibleVerse);
  } catch (error) {
    next(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
    
