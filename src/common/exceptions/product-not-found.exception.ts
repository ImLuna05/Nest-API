import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`El producto con ID ${id} no fue encontrado.`);
  }
}