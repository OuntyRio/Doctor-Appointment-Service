import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config();

const winstonFormat = winston.format.combine(
  winston.format.timestamp( { format: process.env.WINSTON_FORMAT_TIMESTAMP } ),
  winston.format.printf( ( info ) => `${info.timestamp}, ${info.level}: ${info.message}` ),
);

const logger = winston.createLogger( {
  format: winstonFormat,
  transports: [
    new winston.transports.File( {
      filename: String( process.env.WINSTON_INFOLOG_FILE ),
      maxsize: Number( process.env.WINSTON_LOGFILE_MAXSIZE ),
      maxFiles: Number( process.env.WINSTON_LOGFILE_QUANTITY ),
      level: 'info',
    } ),
  ],
} );

export default logger;
