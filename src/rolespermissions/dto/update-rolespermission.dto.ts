import { PartialType } from '@nestjs/mapped-types';
import { CreateRolespermissionDto } from './create-rolespermission.dto';

export class UpdateRolespermissionDto extends PartialType(CreateRolespermissionDto) {}
