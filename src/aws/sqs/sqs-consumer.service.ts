import { Consumer } from 'sqs-consumer';
import { Logger } from '@nestjs/common';
import { AwsDelegatorService } from '../aws-delegator.service';
import * as AWS from 'aws-sdk';

const logger = new Logger('SQS Consumer');
const awsDelegatorService = new AwsDelegatorService();

export const createSQSConsumer = () => {

    AWS.config.update({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    logger.log({ label: 'Start SQS Consumer message', method: 'createSQSConsumer.handleMessage', message: null });
    const app = Consumer.create({
        queueUrl: process.env.AWS_SQS_URL.toString(),
        sqs: new AWS.SQS(),
        batchSize: Number(process.env.BATCH_SIZE),
        handleMessage: async (message) => {
            logger.log({ label: 'SQS Consumer handle message', method: 'createSQSConsumer.handleMessage', message });
            await awsDelegatorService.delegateMessage(JSON.parse(message.Body));
        },
    });

    app.on('error', (err) => {
        logger.error({ label: 'SQS Consumer error', method: 'createSQSConsumer', message: err });
    });

    app.on('processing_error', (err) => {
        logger.error({ label: 'SQS processing error', method: 'createSQSConsumer', message: err });
    });

    app.start();
};
