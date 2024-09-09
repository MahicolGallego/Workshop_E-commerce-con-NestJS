import { IsInt, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  products: number[];
}
