import { Controller } from "@nestjs/common";
import { KibanaService } from "./kibana.service";

@Controller()
export class KibanaController {
    constructor(private kibanaService: KibanaService) {}
}