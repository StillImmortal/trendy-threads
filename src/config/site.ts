import { MainNavItem } from "@/types"

import { slugify } from "@/lib/utils"

import { productCategories } from "./products"

export const siteConfig = {
  name: "Trendy Threads",
  description:
    "An open source e-commerce skateshop build with everything new in Next.js 13.",
  url: "",
  ogImage: "",
  mainNav: [
    {
      title: "Lobby",
      items: [
        {
          title: "Products",
          href: "/products",
          description:
            "Discover a diverse collection of clothing and accessories.",
          items: [],
        },
        {
          title: "Build a T-Shirt",
          href: "/build-a-t-shirt",
          description:
            "Customize your unique t-shirt. Design a personalized garment.",
          items: [],
        },
        {
          title: "Blog",
          href: "/blog",
          description:
            "Stay updated with our fashion blog for the latest trends and style tips.",
          items: [],
        },
      ],
    },
    ...productCategories.map((category) => ({
      title: category.title,
      items: [
        {
          title: "All",
          href: `/categories/${slugify(category.title)}`,
          description: `All ${category.title}.`,
          items: [],
        },
        ...category.subCategories.map((subCategory) => ({
          title: subCategory.title,
          href: `/categories/${slugify(category.title)}/${subCategory.slug}`,
          description: subCategory.description,
          items: [],
        })),
      ],
    })),
  ] satisfies MainNavItem[],
}
