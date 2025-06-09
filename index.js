const express = require('express');
const app = express();

// Route dasar
app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

// Ekspor app untuk Vercel
module.exports = app;

// Untuk development lokal
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}