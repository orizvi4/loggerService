import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './components/logger/logger.module';
import { KibanaModule } from './components/kibana/kibana.module';

@Module({
  imports: [LoggerModule, KibanaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
