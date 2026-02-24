const app = require('./app');
const { PORT } = require('./config/env');
const logger = require('./utils/logger');

app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Server listening');
});
