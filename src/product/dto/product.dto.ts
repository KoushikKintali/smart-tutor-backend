import { IsDefined, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class GetSchoolTypeDTO {
    @IsNumberString()
    @IsDefined()
    @IsNotEmpty()
    schoolId: number;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    academicYearId: string;
}

export enum SchoolType {
    INTEGRATED = 'Integrated',
    LEAD_PLUS = 'LEAD+',
    PLATFORM_ONLY = 'Platform Only'
}