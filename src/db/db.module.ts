import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';
import { AcademicYearsRepository } from './repositories/academic-years.repository';
import { ClassSubjectRepository } from './repositories/class-subjects.repository';
import { SchoolClassesRepository } from './repositories/school-classes.repository';
import { SchoolsRepository } from './repositories/schools.repository';
import { SubjectChaptersRepository } from './repositories/subject-chapters.repository';
import { SynopsisBlobRepository } from './repositories/synopsis-blob.repository';
import { SynopsisRepository } from './repositories/synopsis.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AcademicYearsRepository,
            SchoolsRepository,
            ClassSubjectRepository,
            SchoolClassesRepository,
            SubjectChaptersRepository,
            SynopsisBlobRepository,
            SynopsisRepository,
        ]),
    ],
    providers: [DbService],
    exports: [
        DbService,
        TypeOrmModule.forFeature([
            AcademicYearsRepository,
            SchoolsRepository,
            ClassSubjectRepository,
            SchoolClassesRepository,
            SubjectChaptersRepository,
            SynopsisBlobRepository,
            SynopsisRepository,
        ]),
    ],
})
export class DbModule { }
