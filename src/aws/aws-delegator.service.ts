import { Injectable } from '@nestjs/common';
import { MessageBody } from './dto/aws.dto';

@Injectable()
export class AwsDelegatorService {

    delegateMessage(message: MessageBody) {
        switch (message.type) {
            case 'a':
                // Process message & change value
                break;

            default:
                break;
        }
    }

}
