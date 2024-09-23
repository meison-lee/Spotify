const express = require('express');
const app = express();
const cors = require('cors')
const routes = require('./routes/index');


// Middleware
app.use(express.json());  // To parse JSON body
app.use(cors())

app.use('/api/v1', routes)

// Server Setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
