const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const artistRoutes = require('./routes/artist')
const albumRoutes = require('./routes/album');
const searchRoutes = require('./routes/search');
const playRoutes = require('./routes/play');


// Middleware
app.use(express.json());  // To parse JSON body

// Routes
app.use('/user', userRoutes);
app.use('/album', albumRoutes);
app.use('/artist', artistRoutes)
app.use('/play', playRoutes);
app.use('/search', searchRoutes);

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
