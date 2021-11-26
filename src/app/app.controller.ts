import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('health')
    getHealth() {
        return this.appService.getHealth();
    }

    // Test api to check pg db connectivity
    @Get('academicYears')
    getAcademicYears() {
        return this.appService.getAcademicYears();
    }

    // Test api to check mongo db connectivity
    @Get('experimentalConfig')
    getExperimentalConfig() {
        return this.appService.getExperimentalConfig();
    }
}
