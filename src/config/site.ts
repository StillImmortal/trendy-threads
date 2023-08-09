import { FooterItem, MainNavItem } from "@/types"

import { productCategories } from "@/config/products"
import { slugify } from "@/lib/utils"

const links = {
  github: "https://github.com/StillImmortal/trendy-threads",
  githubAccount: "https://github.com/StillImmortal",
  discord: "https://discord.com/users/stillimmortal",
}

export type SiteConfig = typeof siteConfig

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
        ...category.subcategories.map((subcategory) => ({
          title: subcategory.title,
          href: `/categories/${slugify(category.title)}/${subcategory.slug}`,
          description: subcategory.description,
          items: [],
        })),
      ],
    })),
  ] satisfies MainNavItem[],
  links,
  footerNav: [
    {
      title: "Credits",
      items: [
        {
          title: "Acme Corp",
          href: "https://acme-corp.jumr.dev",
          external: true,
        },
        {
          title: "Taxonomy",
          href: "https://tx.shadcn.com/",
          external: true,
        },
        {
          title: "shadcn/ui",
          href: "https://ui.shadcn.com",
          external: true,
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Contact",
          href: "/contact",
          external: false,
        },
        {
          title: "Terms",
          href: "/terms",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "GitHub",
          href: links.githubAccount,
          external: true,
        },
        {
          title: "Discord",
          href: links.discord,
          external: true,
        },
      ],
    },
    {
      title: "Lofi",
      items: [
        {
          title: "beats to study to",
          href: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
          external: true,
        },
        {
          title: "beats to chill to",
          href: "https://www.youtube.com/watch?v=rUxyKA_-grg",
          external: true,
        },
        {
          title: "a fresh start",
          href: "https://www.youtube.com/watch?v=rwionZbOryo",
          external: true,
        },
        {
          title: "coffee to go",
          href: "https://www.youtube.com/watch?v=2gliGzb2_1I",
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
}
