import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';
import { AcademicYearsRepository } from './repositories/academic-years.repository';
import { ExperimentalConfig, ExperimentalConfigSchema } from './schema/experimental-config.schema';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AcademicYearsRepository,
        ]),
        MongooseModule.forFeature([
            { name: ExperimentalConfig.name, schema: ExperimentalConfigSchema },
        ]),
    ],
    providers: [DbService],
    exports: [
        DbService,
        TypeOrmModule.forFeature([
            AcademicYearsRepository,
        ]),
        MongooseModule.forFeature([
            { name: ExperimentalConfig.name, schema: ExperimentalConfigSchema },
        ]),
    ],
})
export class DbModule { }
