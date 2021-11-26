import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolAcadYearRepository } from '../db/repositories/school-acadyear.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SchoolAcadYearRepository,
        ]),
    ],
    providers: [ProductService],
    controllers: [ProductController],
})
export class ProductModule { }
