import { PartialType } from '@nestjs/mapped-types';
import { CreateRolePermissionDto } from './create-rolespermission.dto';

export class UpdateRolespermissionDto extends PartialType(CreateRolePermissionDto) {}
