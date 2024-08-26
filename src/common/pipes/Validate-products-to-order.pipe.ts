import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidateProductsToOrderPipe implements PipeTransform {
    transform(requestData: any) {
        if (!requestData.products.length) {
            throw new BadRequestException('The order does not contain any products')
        }
        return requestData;
    }
}