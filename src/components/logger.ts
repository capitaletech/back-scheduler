import pino from 'pino';
import config from '../config';

const logger = pino({
  name: config.log.name,
  level: config.log.level,
  prettyPrint: config.log.prettyPrint,
  base: config.log.base,
});

export default logger;
