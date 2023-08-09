import { Container, ErrorCard } from "@/components/custom"

export default function StoreNotFound() {
  return (
    <Container variant="centered">
      <ErrorCard
        title="Store not found"
        description="The store may have expired or you may have already updated your store"
        retryLink="/dashboard/stores"
        retryLinkText="Go to Stores"
      />
    </Container>
  )
}
