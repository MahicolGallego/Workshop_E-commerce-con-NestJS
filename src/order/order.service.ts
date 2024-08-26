import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Double, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {

    // Buscar usuario en la base de datos
    const user = await this.usersRepository.findOne({ where: { id: createOrderDto.user_id } })
    if (!user) {
      throw new NotFoundException('User do not exist');
    }

    // Buscar los productos en la base de datos
    const products: Product[] = [];

    // Verificar que todos los productos sean válidos
    for (let id of createOrderDto.products) {
      const product = await this.productsRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException('Some products do not exist');
      }
      products.push(product);
    }

    //Calcular costo total de la orden
    const totalPrice: number = products.reduce((Result: number, currentElement: Product) => {
      return Result += currentElement.price;
    }, 0)


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
    return await this.ordersRepository.findOne({ where: { id }, relations: ['user', 'products'] });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResult> {
    const order = await this.ordersRepository.findOne({ where: { id }, relations: ['products'] });

    if (!order) {
      throw new NotFoundException(`Order not found`);
    }
    return await this.ordersRepository.update(id, updateOrderDto);
  }

  async remove(id: number) {
    return await this.ordersRepository.softDelete(id);
  }
}
