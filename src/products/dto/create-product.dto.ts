import { IsString, IsDecimal, IsOptional, Length } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @Length(1, 255)
    name: string;

    @IsDecimal({ decimal_digits: '2', force_decimal: true })
    price: number;

    @IsOptional()
    @IsString()
    description?: string;
}
