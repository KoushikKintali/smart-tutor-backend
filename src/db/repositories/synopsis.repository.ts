import { EntityRepository, Repository } from 'typeorm';
import { Synopsis } from '../entities/synopsis.entity';

@EntityRepository(Synopsis)
export class SynopsisRepository extends Repository<Synopsis> {

}
