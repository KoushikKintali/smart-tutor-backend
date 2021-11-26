import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClassSubjects } from './class-subjects.entity';
import { Synopsis } from './synopsis.entity';

@Entity('subject_chapters')
export class SubjectChapters {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    class_subject_id: number;

    @ManyToOne(() => ClassSubjects, (classSubject) => classSubject.id)
    @JoinColumn({ name: 'class_subject_id' })
    classSubject: ClassSubjects;

    @OneToMany(() => Synopsis, (synopsis) => synopsis.subjectChapters, { cascade: true, eager: true })
    synopsis: Synopsis[]
}
