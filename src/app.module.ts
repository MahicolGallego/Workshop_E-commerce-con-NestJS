import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { RolespermissionsModule } from './rolespermissions/rolespermissions.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RolesModule } from './roles/roles.module';
import { EntityModule } from './entity/entity.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { EntityModel } from './entity/entities/entity.entity';
import { RolePermission } from './rolespermissions/entities/rolespermissions.entity';
import { Product } from './products/entities/product.entity';
import { Order } from './order/entities/order.entity';


@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Role, EntityModel, RolePermission, Product, Order],
        //autoLoadEntities: true,
        synchronize: true,
        logging: true,
    })
  }), UsersModule, ProductsModule, OrderModule, RolespermissionsModule, AuthModule, CommonModule, RolesModule, EntityModule],
  providers: [],
})
export class AppModule {}

