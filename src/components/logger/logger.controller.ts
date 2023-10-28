import { Body, Controller, Post } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { LogDTO } from "./models/logDTO.interface";

@Controller()
export class LoggerController {
    constructor(private loggerService: LoggerService) {}

    @Post('/info')
    info(@Body() body: LogDTO): void {
        this.loggerService.logInfo(body.message, body.elasticIndex);
    }
    @Post('/error')
    error(@Body() body: LogDTO): void {
        this.loggerService.logError(body.message, body.elasticIndex, body.category);
    }
}