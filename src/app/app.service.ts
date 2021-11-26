import { HttpStatus, Injectable } from '@nestjs/common';
import { AcademicYearsRepository } from '../db/repositories/academic-years.repository';
import { NotificationService } from '../network/notification/notification.service';
@Injectable()
export class AppService {
    constructor(
        private academicYearsRepository: AcademicYearsRepository,

        private notificationService: NotificationService,

    ) { }

    getHealth() {
        return {
            code: HttpStatus.OK,
            status: 'ok',
        };
    }

    getAcademicYears() {
        return this.academicYearsRepository.getAcademicYears();
    }
}
