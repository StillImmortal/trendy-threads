interface UserInterface {
  id: string
  email: string
  password: string
  imageUrl: string
  phone: string
  created_at: string
  updated_at: string
}

interface ProductInterface {
  id: string
  userId: string
  imageUrl: string
  title: string
  brand: string
  price: string
  created_at: string
  updated_at: string
}

interface PostInterface {
  id: string
  userId: string
  title: string
  text: string
  created_at: string
  updated_at: string
}