import { IsString, IsEmail, Length, IsInt, IsPositive } from 'class-validator';

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

  @IsInt()
  @IsPositive()
  role_id: number;
}
