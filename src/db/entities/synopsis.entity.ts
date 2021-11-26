import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectChapters } from './subject-chapters.entity';
import { SynopsisBlob } from './synopsis-blob.entity';

@Entity('synopsis')
export class Synopsis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    subject_chapter_id: number;

    @ManyToOne(() => SubjectChapters, (subjectChapters) => subjectChapters.id)
    @JoinColumn({ name: 'subject_chapter_id' })
    subjectChapters: SubjectChapters;

    @OneToMany(() => SynopsisBlob, (synopsisBlobs) => synopsisBlobs.synopsis, { cascade: true, eager: true })
    synopsisBlobs: SynopsisBlob[]
}
