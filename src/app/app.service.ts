import { HttpStatus, Injectable } from '@nestjs/common';
import { AcademicYearsRepository } from '../db/repositories/academic-years.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExperimentalConfig, ExperimentalConfigDocument } from '../db/schema/experimental-config.schema';
import { NotificationService } from '../network/notification/notification.service';
import { SQSService } from '../aws/sqs/sqs.service';
@Injectable()
export class AppService {
    constructor(
        @InjectModel(ExperimentalConfig.name) private experimentalModel: Model<ExperimentalConfigDocument>,
        private academicYearsRepository: AcademicYearsRepository,

        private notificationService: NotificationService,

        private sqsService: SQSService,
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

    getExperimentalConfig() {
        const data = this.experimentalModel.find();
        return data;
    }
}
