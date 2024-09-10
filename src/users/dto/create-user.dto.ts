import { IsString, IsEmail, Length } from 'class-validator';
import { Roles } from 'src/common/constans/enum.roles';

export class CreateUserDto {
  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(3, 255) // Asumiendo una longitud mínima para el name
  name: string;

  @IsString()
  @Length(8, 255) // Asumiendo una longitud mínima para la contraseña
  password: string;

  @IsString()
  @Length(3, 255) // Asumiendo una longitud mínima para el name
  role: Roles;
  // @IsInt()
  // @IsPositive()
  // role_id: number;
}
