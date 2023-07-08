export class User implements UserInterface {
  id: string;
  email: string;
  password: string;
  imageUrl: string;
  phone: string;
  created_at: string;
  updated_at: string;

  constructor(user: UserInterface) {
    this.id = user.id
    this.email = user.email
    this.password = user.password
    this.imageUrl = user.imageUrl
    this.phone = user.phone
    this.created_at = user.created_at
    this.updated_at = user.updated_at
  }
}

export class Product implements ProductInterface {
  id: string;
  userId: string;
  title: string;
  brand: string;
  price: string;
  imageUrl: string;
  created_at: string;
  updated_at: string;

  constructor(product: ProductInterface) {
    this.id = product.id
    this.userId = product.userId
    this.title = product.title
    this.brand = product.brand
    this.price = product.price
    this.imageUrl = product.imageUrl
    this.created_at = product.created_at
    this.updated_at = product.updated_at
  }
}

export class Post implements PostInterface {
  id: string;
  userId: string;
  title: string;
  text: string;
  created_at: string;
  updated_at: string;

  constructor(post: PostInterface) {
    this.id = post.id
    this.userId = post.userId
    this.title = post.title
    this.text = post.text
    this.created_at = post.created_at
    this.updated_at = post.updated_at
  }
}