import { Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-rolespermission.dto';
import { UpdateRolespermissionDto } from './dto/update-rolespermission.dto';

@Injectable()
export class RolesPermissionsService {
  create(createRolespermissionDto: CreateRolePermissionDto) {
    return 'This action adds a new rolespermission';
  }

  findAll() {
    return `This action returns all rolespermissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolespermission`;
  }

  update(id: number, updateRolespermissionDto: UpdateRolespermissionDto) {
    return `This action updates a #${id} rolespermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolespermission`;
  }
}
