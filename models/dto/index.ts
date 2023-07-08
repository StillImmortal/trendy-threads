import { User, Product, Post } from "../domain"

export class UserDTO  {
  id: string;
  email: string;
  imageUrl: string;

  constructor(user: User) {
    this.id = user.id
    this.email = user.email
    this.imageUrl = user.imageUrl
  }
}

export class ProductDTO {
  id: string;
  userId: string;
  title: string;
  brand: string;
  price: string;
  imageUrl: string;
  created_at: string;
  updated_at: string;

  constructor(product: Product) {
    this.id=product.id
    this.userId=product.userId
    this.title=product.title
    this.brand=product.brand
    this.price=product.price
    this.imageUrl=product.imageUrl
    this.created_at=product.created_at
    this.updated_at=product.updated_at
  }
}

export class PosttDTO {
  id: string;
  userId: string;
  title: string;
  text: string;
  created_at: string;
  updated_at: string;

  constructor(post: Post) {
    this.id=post.id
    this.userId=post.userId
    this.title=post.title
    this.text = post.text
    this.created_at=post.created_at
    this.updated_at=post.updated_at
  }
}