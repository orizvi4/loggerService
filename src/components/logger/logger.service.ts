import { Injectable } from "@nestjs/common";

const bunyan = require('bunyan');
const bunyanLogstashTcp = require('bunyan-logstash-tcp');


@Injectable()
export class LoggerService {
    constructor() {
        this.connectToLogstash();
    }
    logger;
    
    connectToLogstash(reconnect = false) {
        const logstashStream = bunyanLogstashTcp.createStream({
            host: '127.0.0.1',
            port: 5000
        });
        logstashStream.on('error', async () => {
            if (!reconnect) {
                console.log("can't connect to logstash");
            }
            await new Promise((resolve) => { setTimeout(resolve, 2500) });
            console.log("trying to reconnect to logstash...");
            this.connectToLogstash(true);
        });
        logstashStream.on('connect', () => {
            this.logger = bunyan.createLogger({
                name: 'logger-service',
                streams: [{
                    stream: logstashStream
                }],
            });
            console.log('Connected successfully to logstash');
        });
        logstashStream.on('disconnect', () => {
            console.log('Disconnected from logstash, attempting to reconnect...');
            this.connectToLogstash(true);
        });
    }

    logInfo(message: string, elasticIndex: string): void {
        this.logger.info({ elasticIndex: elasticIndex, category: 'code' }, message);
    }

    logError(message: string, elasticIndex: string, category: string) {
        this.logger.error({ elasticIndex: elasticIndex, category: category }, message);
    }
}