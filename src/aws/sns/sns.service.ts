import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { MessageBody } from '../dto/aws.dto';

@Injectable()
export class SNSService {
    private readonly logger = new Logger(SNSService.name);
    private readonly sns: AWS.SNS;

    constructor() {
        this.sns = new AWS.SNS();
    }

    async publishMessage(topicArn: string, messageBody: MessageBody) {

        this.logger.log({ label: `SNS publish message started - ${topicArn}`, method: 'sendMessage', message: null });

        const snsParams: AWS.SNS.PublishInput = {
            TopicArn: topicArn,
            Message: JSON.stringify(messageBody),
        };

        try {
            const data = await this.sns.publish(snsParams).promise();

            this.logger.log({ label: `SNS publish message success - ${JSON.stringify(snsParams)}`, method: 'sendMessage', message: null });

            return data;
        } catch (error) {
            this.logger.error({ label: `SNS publish message failed - ${JSON.stringify(snsParams)}`, method: 'publishMessage', message: error });
            throw error;
        }
    }

}
