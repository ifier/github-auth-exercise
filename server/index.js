const { config, app } = require('./server');

const port = process.env.PORT || config.port || 9999;

app.listen(port, null, () => {
  console.log('Started at: http://localhost:' + port);
});
