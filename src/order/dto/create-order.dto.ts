import { IsDecimal, IsInt, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @IsDecimal({ decimal_digits: '2', force_decimal: true })
    @IsNotEmpty()
    totalPrice: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    products: number[];
}
