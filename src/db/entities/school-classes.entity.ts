import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClassSubjects } from './class-subjects.entity';
import { Schools } from './schools.entity';

@Entity('school_classes')
export class SchoolClasses {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    school_id: number;

    @ManyToOne(() => Schools, (school) => school.id)
    @JoinColumn({ name: 'school_id' })
    school: Schools;

    @OneToMany(() => ClassSubjects, (classSubjects) => classSubjects.schoolClass, { cascade: true, eager: true })
    classSubjects: ClassSubjects[]
}
