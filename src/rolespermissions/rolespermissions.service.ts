import { Injectable } from '@nestjs/common';
import { CreateRolespermissionDto } from './dto/create-rolespermission.dto';
import { UpdateRolespermissionDto } from './dto/update-rolespermission.dto';

@Injectable()
export class RolesPermissionsService {
  create(createRolespermissionDto: CreateRolespermissionDto) {
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
