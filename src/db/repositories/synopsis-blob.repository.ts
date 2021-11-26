import { EntityRepository, Repository } from 'typeorm';
import { SynopsisBlob } from '../entities/synopsis-blob.entity';

@EntityRepository(SynopsisBlob)
export class SynopsisBlobRepository extends Repository<SynopsisBlob> {

}
