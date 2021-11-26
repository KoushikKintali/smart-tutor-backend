import { Injectable, Logger } from '@nestjs/common';
import { NetworkService } from '../network.service';

@Injectable()
export class SlackService {
    private readonly logger = new Logger(SlackService.name);
    constructor(
        private networkService: NetworkService,
    ) { }

    async sendAlert(msg: any) {
        if (typeof (msg) === 'object') {
            msg = '```' + JSON.stringify(msg) + '```';
        }

        const data = {
            text: msg,
        };

        const headers = {
            'Content-type': 'application/json',
        };

        const slackChannelURL: string = process.env.SLACK_CHANNEL_URL || '';

        try {
            await this.networkService.post(slackChannelURL, data, { headers });
        } catch (error) {
            this.logger.error({
                method: 'sendAlert',
                message: error,
            });
            throw error;
        }
    }
}