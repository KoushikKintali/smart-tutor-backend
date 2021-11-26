import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from '../db/config/typeorm.config';
import { ProductModule } from '../product/product.module';
import { AwsModule } from '../aws/aws.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModule } from '../db/db.module';
import { NetworkModule } from '../network/network.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync(TypeOrmConfig),
        MongooseModule.forRoot(process.env.MONGO_DB_URL),
        ProductModule,
        AwsModule,
        DbModule,
        NetworkModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
