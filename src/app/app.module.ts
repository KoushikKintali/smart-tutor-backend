import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from '../db/config/typeorm.config';
import { DbModule } from '../db/db.module';
import { NetworkModule } from '../network/network.module';
import { SynopsisModule } from '../synopsis/synopsis.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync(TypeOrmConfig),
        DbModule,
        NetworkModule,
        SynopsisModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
