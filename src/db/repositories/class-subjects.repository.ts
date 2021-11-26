import { EntityRepository, Repository } from 'typeorm';
import { ClassSubjects } from '../entities/class-subjects.entity';

@EntityRepository(ClassSubjects)
export class ClassSubjectRepository extends Repository<ClassSubjects> {

}
