import { Controller, Get, Query } from '@nestjs/common';
import { GetSchoolTypeDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {

    constructor(
        private productService: ProductService
    ) { }

    @Get('offering/schools')
    getSchoolType(
        @Query() query: GetSchoolTypeDTO,
    ) {
        return this.productService.getSchoolType(query);
    }
}
