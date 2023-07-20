import React from 'react'
import { type Metadata } from 'next'

import { Container } from '@/components/custom'
import { Products } from '@/components/lobby/products'
import { SectionHeader } from '@/components/layout'

export const metadata: Metadata = {
  //metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Products",
  description: "Buy products from our stores",
}

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const ProductsPage = ({
  searchParams
}: ProductsPageProps) => {
  return (
    <Container>
      <SectionHeader 
        title="Products"
        description="Buy products from our stores"
        size="sm"
      />
      <Products searchParams={searchParams} />
    </Container>
  )
}

export default ProductsPage