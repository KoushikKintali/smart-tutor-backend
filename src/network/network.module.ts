import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NotificationService } from './notification/notification.service';
import { SlackService } from './slack/slack.service';

@Module({
    providers: [
        NetworkService,
        SlackService,
        NotificationService,
    ],
    exports: [
        NetworkService,
        SlackService,
        NotificationService,
    ],
})
export class NetworkModule { }
