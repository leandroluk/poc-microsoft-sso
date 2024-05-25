import {vars} from '#/vars';
import winston from 'winston';

const transports: winston.transport[] = [new winston.transports.Console()];

if (vars.app.logFile) {
  transports.push(
    new winston.transports.File({
      filename: '.tmp/log.json',
      level: 'debug',
    })
  );
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {app: vars.app.slug},
  transports,
});
