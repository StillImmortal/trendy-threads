import { type Product } from "@/db/schema"

export const productCategories = [
  {
    title: "clothing",
    image: "/images/categories/category-clothing.jpg",
    subCategories: [
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
    subCategories: [
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
    subCategories: [
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
  subCategories: {
    title: string
    description?: string
    image?: string
    slug: string
  }[]
}[]

export const getSubcategories = (category?: string) => {
  if (!category) return []

  const subCategories =
    productCategories
      .find((c) => c.title === category)
      ?.subCategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? []

  return subCategories
}
