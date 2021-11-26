import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SchoolClasses } from './school-classes.entity';

@Entity('schools')
export class Schools {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => SchoolClasses, (schoolClasses) => schoolClasses.school, { cascade: true, eager: true })
    schoolClasses: SchoolClasses[]
}
