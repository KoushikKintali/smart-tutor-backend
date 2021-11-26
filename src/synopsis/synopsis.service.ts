import { BadRequestException, Injectable } from '@nestjs/common';
import { SchoolsRepository } from '../db/repositories/schools.repository';

@Injectable()
export class SynopsisService {
    constructor(
        private readonly schoolsRepository: SchoolsRepository,
    ) { }

    async getSynopsis(schoolId: number) {
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
}
