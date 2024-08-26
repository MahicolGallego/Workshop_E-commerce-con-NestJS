import { Product } from "src/products/entities/product.entity";

export const calculateTotalPrice = (productsList: Product[]): number => {
    const newTotalPrice = productsList.reduce((Result: number, currentElement: Product) => {
        if (typeof currentElement.price !== 'number') {
            console.log(currentElement.price);
            throw new Error(`Price must be a number, got ${typeof currentElement.price}`);
        }
        return Result + currentElement.price;  // Usar "+" en lugar de "+="
    }, 0);

    console.log(typeof newTotalPrice);  // Asegúrate de que esto siempre sea "number"
    console.log(newTotalPrice);

    return parseFloat(newTotalPrice.toFixed(2));
}