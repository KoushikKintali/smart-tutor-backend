import { EntityRepository, Repository } from 'typeorm';
import { Schools } from '../entities/schools.entity';

@EntityRepository(Schools)
export class SchoolsRepository extends Repository<Schools> {
    getSchools() {
        return this.find();
    }
}
