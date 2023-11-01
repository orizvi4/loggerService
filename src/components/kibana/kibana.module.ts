import { Module } from "@nestjs/common";
import { KibanaController } from "./kibana.controller";
import { KibanaService } from "./kibana.service";

@Module({
    imports: [],
    controllers: [KibanaController],
    providers: [KibanaService],
  })
  export class KibanaModule {}
