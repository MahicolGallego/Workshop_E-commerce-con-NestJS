import { Product } from 'src/products/entities/product.entity';

export const pricesConvertToFloat = (products: Product[]): Product[] => {
  try {
    products.forEach(
      (product) =>
        (product.price = parseFloat(product.price as unknown as string)),
    );
  } catch (error) {
    throw new Error(`Price must be a number, got a different data type`);
  }
  return products;
};
