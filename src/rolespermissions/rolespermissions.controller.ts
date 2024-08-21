import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesPermissionsService } from './rolespermissions.service';
import { CreateRolespermissionDto } from './dto/create-rolespermission.dto';
import { UpdateRolespermissionDto } from './dto/update-rolespermission.dto';

@Controller('rolespermissions')
export class RolesPermissionsController {
  constructor(private readonly rolesPermissionsService: RolesPermissionsService) {}

  @Post()
  create(@Body() createRolespermissionDto: CreateRolespermissionDto) {
    return this.rolesPermissionsService.create(createRolespermissionDto);
  }

  @Get()
  findAll() {
    return this.rolesPermissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesPermissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolespermissionDto: UpdateRolespermissionDto) {
    return this.rolesPermissionsService.update(+id, updateRolespermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesPermissionsService.remove(+id);
  }
}
