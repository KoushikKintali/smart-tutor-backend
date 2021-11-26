import { EntityRepository, Repository } from 'typeorm';
import { AcademicYears } from '../entities/academic-years.entity';

@EntityRepository(AcademicYears)
export class AcademicYearsRepository extends Repository<AcademicYears> {
    getAcademicYears() {
        return this.find();
    }
}
