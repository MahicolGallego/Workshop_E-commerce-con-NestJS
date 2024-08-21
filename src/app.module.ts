import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { RolespermissionsModule } from './rolespermissions/rolespermissions.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [],
        // autoLoadEntities: true,
        synchronize: true,
        logging: true,
    })
  }), UsersModule, ProductsModule, OrderModule, RolespermissionsModule, AuthModule, CommonModule],
  providers: [],
})
export class AppModule {}
