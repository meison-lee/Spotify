const express = require('express');
const app = express();
const searchRoutes = require('./routes/search');
const playRoutes = require('./routes/play');
const userRoutes = require('./routes/user');


// Middleware
app.use(express.json());  // To parse JSON body

// Routes
app.use('/user', userRoutes);
app.use('/search', searchRoutes);
app.use('/play', playRoutes);

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
