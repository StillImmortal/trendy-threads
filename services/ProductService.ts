import { Product } from "@/models/domain"
import { db } from "@/db";
import { users, products } from "@/db/schema";
import { eq } from "drizzle-orm";

interface ProductServiceInterface {
  getAllProducts: () => Promise<any[]>;
  getProductById: (id: string) => Product;
  addProduct: (product: Product) => void;
  updateProductById: (id: string, product: Product) => void;
}

class ProductService implements ProductServiceInterface {
  async getAllProducts(): Promise<any[]> {
    const allProducts = await db.select({
      product: products.title,
      user: users.name
    })
    .from(products)
    .innerJoin(users, eq(products.userId, users.id))
    return allProducts 
  }

  getProductById(id: string): Product {
    return {} as Product
  }

  addProduct(product: Product): void {

  }

  updateProductById(id: string, product: Product): void {

  }
}

export default new ProductService()