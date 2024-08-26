import { Product } from "src/products/entities/product.entity";
import { Repository } from "typeorm";

export const getProducts = (productIdList: number[], Repository: Repository<Product>): Product[] => {
    const products: Product[] = []
    for (let id of productIdList) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException('Some products do not exist');
        }
        products.push(product);
    }
}

