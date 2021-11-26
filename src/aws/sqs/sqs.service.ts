import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { MessageBody } from '../dto/aws.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SQSService {
    private readonly logger = new Logger(SQSService.name);
    private readonly sqs: AWS.SQS;

    constructor() {
        this.sqs = new AWS.SQS();
    }

    async sendMessage(queueUrl: string, messageBody: MessageBody) {

        const sqsParams: AWS.SQS.SendMessageRequest = {
            MessageBody: JSON.stringify(messageBody),
            MessageGroupId: uuidv4(),
            QueueUrl: queueUrl,
        };

        this.logger.log({ label: `SQS send message started - ${JSON.stringify(sqsParams)}`, method: 'sendMessage', message: null });

        try {
            const data = await this.sqs.sendMessage(sqsParams).promise();
            this.logger.log({ label: `SQS send message success - ${JSON.stringify(sqsParams)}`, method: 'sendMessage', message: null });
            return data;
        } catch (error) {
            this.logger.error({ label: `SQS send message failed - ${JSON.stringify(sqsParams)}`, method: 'sendMessage', message: error });
            throw error;
        }
    }
}