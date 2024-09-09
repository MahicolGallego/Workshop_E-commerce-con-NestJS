import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/product.entity';
import { pricesConvertToFloat } from 'src/common/helpers/prices-convert-to-float';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.productRepository.softDelete(id);
  }

  async findByIds(productIds: number[]): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: { id: In(productIds) },
    });
    // Verificar si todos los IDs solicitados se encontraron
    if (products.length !== productIds.length) {
      // Determinar los IDs no encontrados
      const foundIds = new Set<number>(products.map((product) => product.id));
      const notFoundIds = productIds.filter((id) => !foundIds.has(id));

      // Lanzar una excepción si algunos IDs no se encontraron
      throw new NotFoundException(
        `Products with IDs not found: ${notFoundIds.join(', ')}`,
      );
    }
    return products;
  }

  calculateTotalPrice(productsList: Product[]): number {
    const productsWithPricesConvertToFloat = pricesConvertToFloat(productsList);
    const newTotalPrice = productsWithPricesConvertToFloat.reduce(
      (Result: number, currentElement: Product) => {
        return Result + currentElement.price; // Usar "+" en lugar de "+="
      },
      0,
    );

    return parseFloat(newTotalPrice.toFixed(2));
  }
}
