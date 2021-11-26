import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
    private readonly logger = new Logger(S3Service.name);
    private readonly s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3();
    }

    async uploadToS3(fileName: string, bucketName: string, body: any) {

        this.logger.log({ label: `Upload file to S3 started - ${fileName}`, method: 'uploadToS3', message: null });

        const uploadParams: AWS.S3.PutObjectRequest = {
            Key: fileName,
            Bucket: bucketName,
            Body: body,
        };

        try {
            const data = await this.s3.upload(uploadParams).promise();
            this.logger.log({ label: `Upload file to S3 success - ${fileName}`, method: 'uploadToS3', message: data });
            return data;
        } catch (error) {
            this.logger.error({ label: `Failed to upload file in S3 - ${fileName}`, method: 'uploadToS3', message: error.message });
            throw error;
        }
    }

    async generateSignedURL(fileName: string, bucketName: string) {
        const bucketParams = {
            Bucket: bucketName,
            Key: fileName,
            Expires: Number(process.env.AWS_S3_EXPIRY_IN_SEC),
        };

        try {
            const signedUrl = await this.s3.getSignedUrlPromise('getObject', bucketParams);
            return { signedUrl };
        } catch (error) {
            this.logger.error({ label: `Failed to generate signed url - ${fileName}`, method: 'generateSignedURL', message: error });
            throw error;
        }

    }

}