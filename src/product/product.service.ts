import { Injectable } from '@nestjs/common';
import { SchoolAcadYearRepository } from '../db/repositories/school-acadyear.repository';
import { GetSchoolTypeDTO } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(
        private schoolAcadYearRepository: SchoolAcadYearRepository,
    ) { }

    async getSchoolType(query: GetSchoolTypeDTO) {
        const { schoolId, academicYearId } = query;

        const academicYearIds = academicYearId.split(',').map((academicYearId) => Number(academicYearId));

        const schools = await this.schoolAcadYearRepository.getSchoolTypeBySchoolIdAcademicYearId(schoolId, academicYearIds);

        return schools.map((school) => {
            school.schoolType = school.pab_school_type;
            return school;
        });

    }
}
