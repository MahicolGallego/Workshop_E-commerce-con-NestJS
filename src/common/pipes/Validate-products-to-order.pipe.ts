import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidateProductsToOrderPipe implements PipeTransform {

    transform(requestData: any, metadata: ArgumentMetadata) {
        // console.log('Transform Metadata:', metadata);
        // console.log('Request Data:', requestData);
        // console.log('Products:', requestData.products);
        // Verifica si `requestData` tiene la propiedad `products` y es un array
        if (metadata.type === 'body') { // Solo verifica cuando el tipo es `body`
            if (!requestData.products || !Array.isArray(requestData.products)) {
                throw new BadRequestException('Invalid format for products');
            }

            // Verifica si el array de productos está vacío
            if (requestData.products.length === 0) {
                throw new BadRequestException('The order does not contain any products');
            }
        }
        return requestData;
    }
}   