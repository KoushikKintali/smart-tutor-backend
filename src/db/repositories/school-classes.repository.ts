import { EntityRepository, Repository } from 'typeorm';
import { SchoolClasses } from '../entities/school-classes.entity';

@EntityRepository(SchoolClasses)
export class SchoolClassesRepository extends Repository<SchoolClasses> {

}
