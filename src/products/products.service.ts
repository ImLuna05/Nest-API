import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { ProductEntity } from './entities/product.entity.js';
import { ProductNotFoundException } from '../common/exceptions/product-not-found.exception.js';

@Injectable()
export class ProductsService {
  private products: ProductEntity[] = [];

  create(createProductDto: CreateProductDto): ProductEntity {
    const newProduct = { id: Date.now(), ...createProductDto };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): ProductEntity[] {
    return this.products;
  }

  findOne(id: number): ProductEntity {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }
}