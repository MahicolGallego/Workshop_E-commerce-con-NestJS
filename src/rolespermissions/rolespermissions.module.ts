import { Module } from '@nestjs/common';
import { RolesPermissionsService } from './rolespermissions.service';
import { RolesPermissionsController } from './rolespermissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './entities/rolespermissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission])],
  controllers: [RolesPermissionsController],
  providers: [RolesPermissionsService],
})
export class RolespermissionsModule {}
