import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, UseFilters, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { AuthGuard } from '../common/guards/auth.guard.js';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor.js';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter.js';
import { ParseIntIdPipe } from '../common/pipes/parse-int-id.pipe.js';

@Controller('products')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntIdPipe) id: number) {
    return this.productsService.findOne(id);
  }
}