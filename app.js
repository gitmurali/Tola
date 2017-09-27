const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  res.send({ hi: 'there' });
});

module.exports = app;