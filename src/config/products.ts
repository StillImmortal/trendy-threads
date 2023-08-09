import { type Product } from "@/db/schema"

export const sortOptions = [
  { label: "Date: Old to new", value: "createdAt.asc" },
  {
    label: "Date: New to old",
    value: "createdAt.desc",
  },
  { label: "Price: Low to high", value: "price.asc" },
  { label: "Price: High to low", value: "price.desc" },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc",
  },
]

export const productCategories = [
  {
    title: "clothing",
    image: "/images/categories/category-clothing.jpg",
    subcategories: [
      {
        title: "Shirts & T-Shirts",
        description:
          "Elegant tops for every occasion. From formal shirts to casual tees.",
        image: "",
        slug: "shirts-t-shirts",
      },
      {
        title: "Shorts",
        description: "Cool and comfy for warm weather and relaxation.",
        image: "",
        slug: "shorts",
      },
      {
        title: "Jeans & Trousers",
        description:
          "Stylish bottoms for versatile looks. From classic denim to sleek trousers.",
        image: "",
        slug: "jeans-trousers",
      },
      {
        title: "Hoodies & Sweatshirts",
        description: "Cozy and trendy essentials for casual style.",
        image: "",
        slug: "hoodies-sweatshirts",
      },
      {
        title: "Underwear",
        description: "Comfortable essentials for everyday wear.",
        image: "",
        slug: "underwear",
      },
    ],
  },
  {
    title: "shoes",
    image: "/images/categories/category-shoes.jpg",
    subcategories: [
      {
        title: "Boots",
        description: "Stylish and versatile footwear for any occasion.",
        image: "",
        slug: "boots",
      },
      {
        title: "Trainers",
        description: "Modern athletic shoes for active lifestyles.",
        image: "",
        slug: "trainers",
      },
      {
        title: "Sandals",
        description: "Chic and comfortable footwear for sunny days.",
        image: "",
        slug: "sandals",
      },
      {
        title: "Sliders",
        description: "Comfortable and elegant sandals for effortless wear.",
        image: "",
        slug: "sliders",
      },
    ],
  },
  {
    title: "accessories",
    image: "/images/categories/category-accessories.jpg",
    subcategories: [
      {
        title: "Sunglasses",
        description: "Protect your eyes in style with our trendy sunglasses.",
        image: "",
        slug: "sunglasses",
      },
      {
        title: "Caps & Hats",
        description: "Top off your look with our collection of caps and hats.",
        image: "",
        slug: "caps-hats",
      },
      {
        title: "Belts",
        description: "Complete your ensemble with our fashionable belts.",
        image: "",
        slug: "belts",
      },
      {
        title: "Chains & Necklaces",
        description: "Accentuate your outfit with our chains and necklaces.",
        image: "",
        slug: "chains-necklaces",
      },
    ],
  },
] satisfies {
  title: Product["category"]
  image: string
  subcategories: {
    title: string
    description?: string
    image?: string
    slug: string
  }[]
}[]

export const productTags = [
  "new",
  "sale",
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive",
]

export const getSubcategories = (category?: string) => {
  if (!category) return []

  const subcategories =
    productCategories
      .find((c) => c.title === category)
      ?.subcategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? []

  return subcategories
}
