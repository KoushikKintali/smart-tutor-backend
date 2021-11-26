import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Synopsis } from './synopsis.entity';

@Entity('synopsis_blob')
export class SynopsisBlob {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    language: string;

    @Column()
    synopsis_id: number;

    @Column()
    link: string;

    @Column()
    type: string;

    @ManyToOne(() => Synopsis, (synopsis) => synopsis.id)
    @JoinColumn({ name: 'synopsis_id' })
    synopsis: Synopsis;
}
