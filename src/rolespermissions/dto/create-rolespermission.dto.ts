import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateRolePermissionDto {
    @IsInt()
    @IsNotEmpty()
    role_id: number;

    @IsInt()
    @IsNotEmpty()
    entity_id: number;

    @IsBoolean()
    @IsNotEmpty()
    canGet: boolean;

    @IsBoolean()
    @IsNotEmpty()
    canGetOne: boolean;

    @IsBoolean()
    @IsNotEmpty()
    canUpdate: boolean;

    @IsBoolean()
    @IsNotEmpty()
    canDelete: boolean;

    @IsBoolean()
    @IsNotEmpty()
    canCreate: boolean;
}
