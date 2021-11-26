import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SchoolType } from '../../product/dto/product.dto';
import { BaseEntity } from './base.entity';

@Entity('school_acadyear')
export class SchoolAcadYear extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    school_id: number;

    @Column('int')
    academic_year_id: number;

    @Column('int')
    current_term: number;

    @Column('date')
    term2_start_date: Date;

    @Column('int')
    board_id: number;

    @Column('int')
    academic_year_type: number;

    @Column('date')
    academic_year_start: Date;

    @Column('text')
    annexture_file_name: string;

    @Column('text')
    annexture_file_path: string;

    @Column('text')
    agreement_file_name: string;

    @Column('text')
    agreement_file_path: string;

    @Column('boolean')
    is_active: boolean;

    @Column('int')
    previous_board_id: number;

    @Column('text')
    school_type: string;

    @Column('text')
    agreement_link: string;

    @Column('int')
    qoute_id: number;

    @Column('int')
    deal_id: number;

    @Column('json')
    infinity_data: any;

    @Column('json')
    school_config: any;

    @Column('int')
    previous_academic_solution_id: number;

    @Column('json')
    required_elga_teachers: any;

    @Column('int')
    school_state: number;

    @Column('json')
    plugins: any;

    @Column('json')
    onboarding_state_info: any;

    @Column('boolean')
    is_ls_home_active: boolean;

    @Column('boolean')
    is_ccs_enabled: boolean;

    @Column('json')
    elga_state_board_classes: any;

    @Column('int')
    term1_assessment_set: number;

    @Column('int')
    term2_assessment_set: number;

    @Column('int')
    current_term_assessment_set: number;

    @Column({ type: 'enum', enumName: 'pab_school_type', enum: SchoolType })
    pab_school_type: SchoolType;

    schoolType: SchoolType;
    // TODO: Need to remove
    products: any;
}