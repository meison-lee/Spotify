const userRoutes = require('./user');
const artistRoutes = require('./artist')
const albumRoutes = require('./album');
const searchRoutes = require('./search');
const playRoutes = require('./play');
const playlistRoutes = require('./playlist');
const express = require('express');
const app = express();


app.use('/user', userRoutes);
app.use('/album', albumRoutes);
app.use('/artist', artistRoutes)
app.use('/play', playRoutes);
app.use('/search', searchRoutes);
app.use('/playlist', playlistRoutes);


module.exports = app;


