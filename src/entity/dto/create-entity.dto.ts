import { IsString, Length } from "class-validator";

export class CreateEntityDto {
    @IsString()
    @Length(1, 50)
    entity: string;
}
