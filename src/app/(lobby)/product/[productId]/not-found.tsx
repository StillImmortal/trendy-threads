import { Container, ErrorCard } from "@/components/custom"

const ProductNotFound = () => {
  return (
    <Container variant="centered">
      <ErrorCard
        title="Product not found"
        description="The product may have expired or you may have already updated your product"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </Container>
  )
}

export default ProductNotFound
