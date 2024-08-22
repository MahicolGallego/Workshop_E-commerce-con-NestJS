import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @Length(1, 255)
    email: string;

    @IsString()
    @Length(6, 255) // Asumiendo una longitud mínima para la contraseña
    password: string;
}
