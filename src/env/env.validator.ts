import { Logger } from '@nestjs/common';
import { customCleanEnv, EnvMissingError, EnvError } from 'envalid';
import { NetworkService } from '../network/network.service';
import { SlackService } from '../network/slack/slack.service';
import { validator } from './env';

const logger = new Logger('ENV Validator');

const errorHandling = {
    reporter: async ({ errors, env }: any) => {
        const envError = [];
        for (const [envVar, err] of Object.entries(errors)) {
            if (err instanceof EnvError) {
                envError.push({
                    variable: envVar,
                    message: err.message,
                });
            } else if (err instanceof EnvMissingError) {
                envError.push({
                    variable: envVar,
                    message: 'ENV variable is missing',
                });
            } else {
                envError.push({
                    variable: envVar,
                    message: `Error: ${err}`,
                });
            }
        }

        for (const key in env) {
            if (env[key] === '') {
                envError.push({
                    variable: key,
                    message: 'ENV variable is empty',
                });
            }
        }

        if (envError && envError.length) {
            const msg = {
                env: process.env.INSTANCE_ENV,
                error: envError,
            };
            const slackService = new SlackService(new NetworkService());
            try {
                await slackService.sendAlert(msg);
            } catch (error) {
                logger.error({
                    method: 'errorHandling',
                    message: error,
                });
                throw error;
            }
        }
    },
};

const middleware = (envObj: any) => {
    return envObj;
};

export default class EnvValidator {
    static validate() {
        customCleanEnv(process.env, validator, middleware, errorHandling);
    }
}
