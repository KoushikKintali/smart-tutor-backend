import { Module } from '@nestjs/common';
import { AwsDelegatorService } from './aws-delegator.service';
import { S3Service } from './s3/s3.service';
import { SNSService } from './sns/sns.service';
import { SQSService } from './sqs/sqs.service';

@Module({
    providers: [AwsDelegatorService, S3Service, SQSService, SNSService],
    exports: [S3Service, SQSService, SNSService],
})
export class AwsModule { }
