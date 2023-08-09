import { Container, ErrorCard } from "@/components/custom"

interface ProductNotFoundProps {
  params: {
    storeId: string
  }
}

export default function ProductNotFound({ params }: ProductNotFoundProps) {
  const storeId = Number(params.storeId)

  return (
    <Container variant="centered">
      <ErrorCard
        title="Product not found"
        description="The product may have expired or you may have already updated your product"
        retryLink={`/dashboard/stores/${storeId}/products`}
        retryLinkText="Go to Products"
      />
    </Container>
  )
}
