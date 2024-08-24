import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>){}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
      return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.productRepository.findOne({where: {id}, relations: ['orders']});
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<UpdateResult> {
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.productRepository.softDelete(id);
  }
}
