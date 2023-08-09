import { Container, ErrorCard } from "@/components/custom"

const MockPage = () => {
  return (
    <Container variant="centered">
      <ErrorCard
        title="Page doesn't exist"
        description="This is a mock page"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </Container>
  )
}

export default MockPage
