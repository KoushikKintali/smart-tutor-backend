import { AbstractRepository, EntityRepository } from 'typeorm';
import { SchoolAcadYear } from '../entities/school-acadyear.entity';

@EntityRepository(SchoolAcadYear)
export class SchoolAcadYearRepository extends AbstractRepository<SchoolAcadYear> {

    getSchoolTypeBySchoolIdAcademicYearId(schoolId: number, academicYearIds: number[]) {
        const query = this.createQueryBuilder('school_acadyear')
            .select(['school_acadyear.school_id', 'school_acadyear.academic_year_id', 'school_acadyear.pab_school_type'])
            .where('school_id = :schoolId', { schoolId })
            .andWhere('academic_year_id IN (:...academicYearIds)', { academicYearIds });

        return query.getMany();
    }

}
