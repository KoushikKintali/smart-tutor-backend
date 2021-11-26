import { Controller, Get, Param, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SynopsisService } from './synopsis.service';


@Controller()
export class SynopsisController {

    constructor(
        private synopsisService: SynopsisService,
    ) { }

    @Get('/:schoolId/master/classes')
    getSchoolClasses(
        @Param('schoolId') schoolId: number,
    ) {
        return this.synopsisService.getSchoolClasses(schoolId);
    }

    @Get('/:schoolId/master/class')
    getSchoolClass(
        @Param('schoolId') schoolId: number,
    ) {
        return this.synopsisService.getSchoolClass(schoolId);
    }

    @Put('/:schoolId/synopsis/:synopsisId/language/:language/addAudio')
    @UseInterceptors(FileInterceptor('audio', { dest: './audios' }))
    addAudio(
        @Param('schoolId') schoolId: number,
        @Param('synopsisId') synopsisId: number,
        @Param('language') language: string,
        @UploadedFile() audio: Express.Multer.File,
    ) {
        return this.synopsisService.addAudio(schoolId, synopsisId, audio, language);
    }

}
