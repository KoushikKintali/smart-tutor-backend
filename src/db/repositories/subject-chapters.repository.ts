import { EntityRepository, Repository } from 'typeorm';
import { SubjectChapters } from '../entities/subject-chapters.entity';

@EntityRepository(SubjectChapters)
export class SubjectChaptersRepository extends Repository<SubjectChapters> {

}
