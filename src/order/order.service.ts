import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private readonly usersServices: UsersService,
    private readonly productsServices: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Buscar usuario en la base de datos
    const user = await this.usersServices.findOne(createOrderDto.user_id);

    // Buscar los productos en la base de datos
    const products: Product[] = await this.productsServices.findByIds(
      createOrderDto.products,
    );
    //Calcular costo total de la orden
    const totalPrice: number =
      this.productsServices.calculateTotalPrice(products);

    // Crear la instancia de Order
    const order = new Order();
    order.totalPrice = totalPrice;
    order.user = user;
    order.products = products;

    // Guardar la orden en la base de datos
    return await this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.find();
  }

  async findOne(id: number): Promise<Order | null> {
    return await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'products'],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!order) {
      throw new NotFoundException(`Order not found`);
    }

    // Buscar los productos en la base de datos
    const newProducts: Product[] = await this.productsServices.findByIds(
      updateOrderDto.products,
    );

    //Calcular costo total de la orden
    const newTotalPrice: number =
      this.productsServices.calculateTotalPrice(newProducts);

    order.products = [];
    order.products = newProducts;
    order.totalPrice = newTotalPrice;

    return await this.ordersRepository.save(order);
  }

  async remove(id: number) {
    return await this.ordersRepository.softDelete(id);
  }
}
