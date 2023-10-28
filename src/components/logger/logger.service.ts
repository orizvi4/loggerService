import { Injectable } from "@nestjs/common";

const bunyan = require('bunyan');
const logstashStream = require('bunyan-logstash-tcp').createStream({
    host: '127.0.0.1',
    port: 5000
});

const logger = bunyan.createLogger({
    name: 'logger-service',
    streams: [{
        stream: logstashStream
    }],
});

@Injectable()
export class LoggerService {
    logInfo(message, elasticIndex): void {
        logger.info({elasticIndex: elasticIndex, category: 'code'}, message);
    }

    logError(message, elasticIndex, category) {
        logger.error({elasticIndex: elasticIndex, category: category}, message);
    }
}