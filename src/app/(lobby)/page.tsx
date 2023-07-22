"use client"

import React from "react"

import { Container } from "@/components/custom"
import {
  Categories,
  CreateStoreBanner,
  FeaturedProducts,
  FeaturedStores,
  Hero,
  RandomSubCategories,
} from "@/components/lobby"

const page = () => {
  return (
    <Container as="div" className="gap-12">
      <Hero />
      <Categories />
      <CreateStoreBanner />
      <FeaturedProducts />
      <FeaturedStores />
      <RandomSubCategories />
    </Container>
  )
}

export default page
