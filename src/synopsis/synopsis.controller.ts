import { Controller, Get, Param } from '@nestjs/common';
import { SynopsisService } from './synopsis.service';

@Controller()
export class SynopsisController {

    constructor(
        private synopsisService: SynopsisService,
    ) { }

    @Get('/:schoolId/master/subjects')
    getSchoolType(
        @Param('schoolId') schoolId: number,
    ) {
        return this.synopsisService.getSynopsis(schoolId);
    }
}
