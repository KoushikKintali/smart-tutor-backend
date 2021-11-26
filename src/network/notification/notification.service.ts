import { Injectable, Logger } from '@nestjs/common';
import { NetworkService } from '../network.service';
import { Templates } from './dto/notification.dto';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
    constructor(
        private networkService: NetworkService,
    ) { }

    async sendSMS(
        templateName: Templates,
        userId: number,
        contact: { mobile: number, name: string },
        body: any,
    ) {

        const data = {
            communicationName: templateName,
            userWiseCommunicationData: {},
        };
        data.userWiseCommunicationData[userId] = body;
        data.userWiseCommunicationData[userId].contact = contact;

        const notifiactionServiceURL: string = process.env.MSVC_COMM_DISPATCH_URL || '';

        try {
            await this.networkService.post(`${notifiactionServiceURL}/communication/api/sms/v1/sendSMS`, data);
        } catch (error) {
            this.logger.error({
                method: 'sendSMS',
                message: error,
            });
            throw error;
        }
    }
}