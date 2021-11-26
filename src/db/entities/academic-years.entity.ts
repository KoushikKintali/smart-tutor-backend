import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('academic_years')
export class AcademicYears extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    short_code: string;
}
