import { NotFoundException } from "@nestjs/common";
import { Product } from "src/products/entities/product.entity";
import { Repository } from "typeorm";

export const getProducts = async (productIdList: number[], Repository: Repository<Product>): Promise<Product[]> => {
    const products: Product[] = []
    for (let id of productIdList) {
        const product = await Repository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException('Some products do not exist');
        }
        products.push(product);
    }
    return products;
}

