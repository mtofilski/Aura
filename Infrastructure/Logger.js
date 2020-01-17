import { createLogger, format, transports } from 'winston';

const {
  combine, timestamp, prettyPrint,
} = format;

const Logger = createLogger({
  format: combine(
    timestamp(),
  ),
  transports: [
    new transports.File({ filename: 'log/all.log' }),
  ],
});
if (process.env.NODE_ENV !== 'production') {
  Logger.add(new transports.Console({
    format: prettyPrint(),
  }));
}

export { Logger as default };
