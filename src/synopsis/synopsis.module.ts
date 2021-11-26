import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { SynopsisController } from './synopsis.controller';
import { SynopsisService } from './synopsis.service';

@Module({
    controllers: [SynopsisController],
    providers: [SynopsisService],
    imports: [DbModule],
})
export class SynopsisModule { }
