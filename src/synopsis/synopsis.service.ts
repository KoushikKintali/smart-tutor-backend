import { BadRequestException, Injectable } from '@nestjs/common';
import { SchoolsRepository } from '../db/repositories/schools.repository';
import * as path from 'path';
import { SynopsisRepository } from '../db/repositories/synopsis.repository';
import { SynopsisBlob } from '../db/entities/synopsis-blob.entity';

@Injectable()
export class SynopsisService {
    constructor(
        private readonly schoolsRepository: SchoolsRepository,
        private readonly synopsisRepository: SynopsisRepository,
    ) { }

    async getSchoolClasses(schoolId: number) {
        if (!schoolId) {
            throw new BadRequestException('School Id missing');
        }

        try {
            const school = await this.schoolsRepository.getSchools();
            if (!school) {
                throw new BadRequestException('School Not Found');
            }
            return school;

        } catch (error) {
            throw error;
        }
    }

    async getSchoolClass(schoolId: number) {
        if (!schoolId) {
            throw new BadRequestException('School Id missing');
        }

        try {
            const school = await this.schoolsRepository.getSchools();
            if (!school) {
                throw new BadRequestException('School Not Found');
            }
            const schoolClass = school.schoolClasses[0];
            delete school.schoolClasses;
            school['schoolClass'] = schoolClass;
            return school;

        } catch (error) {
            throw error;
        }
    }

    async addAudio(schoolId: number, synopsisId: number, audioFile: Express.Multer.File, language: string) {
        try {

            if (!synopsisId || !language) {
                throw new BadRequestException('SynopsisId or Language is missing');
            }

            const audioFilePath = path.join(__dirname, '../../audios/', audioFile.filename);

            const synopsisData = await this.synopsisRepository.findOne({ id: synopsisId });
            const synopsisBlob = new SynopsisBlob();
            synopsisBlob.language = language;
            synopsisBlob.link = audioFilePath;
            synopsisBlob.synopsis_id = synopsisId;
            synopsisBlob.type = 'TEACHER';
            synopsisData.synopsisBlobs = synopsisData.synopsisBlobs.concat(synopsisBlob);

            return synopsisData;

        } catch (error) {
            throw error;
        }
    }
}
