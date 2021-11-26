import { str, num, url, host, port } from 'envalid';

export const validator = {
    INSTANCE_ENV: str(),
    PORT: port(),

    DB_HOST: host(),
    DB_PORT: port(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),

    AWS_ACCESS_KEY_ID: str(),
    AWS_SECRET_ACCESS_KEY: str(),
    AWS_REGION: str(),
    AWS_S3_EXPIRY_IN_SEC: num(),
    AWS_SQS_URL: url(),

    MONGO_DB_URL: str(),

    SENTRY_DSN: str(),
    SENTRY_ENVIRONMENT: str(),

    SLACK_CHANNEL_URL: url(),

    MSVC_COMM_DISPATCH_URL: url(),
};
