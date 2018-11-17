const express = require('express');
const db = require('./models');

const PORT = process.env.PORT || 8080;

const server = express();

const routes = require('./routes');

server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(express.static('client/dist'));
server.use(routes);

// Catch-all route
server.get('*', (req, res) => {
  res.redirect('/');
});

const syncOptions = {force: false};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  server.listen(PORT, () => {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  });
});

module.exports = server;
