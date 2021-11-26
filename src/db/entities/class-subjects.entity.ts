import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SchoolClasses } from './school-classes.entity';
import { SubjectChapters } from './subject-chapters.entity';

@Entity('class_subjects')
export class ClassSubjects {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    school_class_id: number;

    @ManyToOne(() => SchoolClasses, (schoolClass) => schoolClass.id)
    @JoinColumn({ name: 'school_class_id' })
    schoolClass: SchoolClasses;

    @OneToMany(() => SubjectChapters, (subjectChapter) => subjectChapter.classSubject, { cascade: true, eager: true })
    subjectChapters: SubjectChapters[]
}
