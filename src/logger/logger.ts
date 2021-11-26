import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import DailyRotateFile, { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

const { combine, timestamp, json } = winston.format;

interface LogMessage {
    label?: string;
    method: string;
    message: any;
    request?: any;
    response?: any;
}

const logOptions: DailyRotateFileTransportOptions = {
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '30d',
    filename: '%DATE%.log',
};

const errorLogTransport: DailyRotateFile = new winston.transports.DailyRotateFile({
    ...logOptions,
    filename: 'error-%DATE%.log',
    level: 'error',
});

const combinedLogTransport: DailyRotateFile = new winston.transports.DailyRotateFile({
    ...logOptions,
    filename: 'combined-%DATE%.log',
});

const loggerConfig = {
    format: combine(timestamp(), json()),
    defaultMeta: { service: 'msvc-backend-base' },
    transports: [errorLogTransport, combinedLogTransport, new winston.transports.Console()],
};

export class Logger implements LoggerService {
    private logger: any = null;

    constructor() {
        this.logger = winston.createLogger(loggerConfig);
    }

    log(message: LogMessage, context?: string) {
        this.logger.log('info', message, { context });
    }
    error(message: LogMessage, context?: string) {
        this.logger.error(message, { context });
    }
    warn(message: LogMessage, context?: string) {
        this.logger.warn(message, { context });
    }
    debug?(message: LogMessage, context?: string) {
        this.logger.debug(message, { context });
    }
    verbose?(message: LogMessage, context?: string) {
        this.logger.verbose(message, { context });
    }
}
