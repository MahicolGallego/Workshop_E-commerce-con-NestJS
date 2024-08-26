import { IsString, IsDecimal, IsOptional, Length, Matches } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @Length(1, 255)
    name: string;

    @IsDecimal({ decimal_digits: '2', force_decimal: true })
    @Matches(/^\d+(\.\d{1,2})?$/, { message: 'Price must be a decimal with up to 2 decimal places' })
    price: number;

    @IsOptional()
    @IsString()
    description?: string;
}
