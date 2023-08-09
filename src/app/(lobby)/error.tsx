"use client"

// Error components must be Client Components
import { useEffect } from "react"
import { usePathname } from "next/navigation"

import { Container, ErrorCard } from "@/components/custom"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Container variant="centered">
      <ErrorCard
        title="Something went wrong!"
        description="An error might have occurred while requesting data"
        retryLink={pathname}
        retryLinkText="Try again"
      />
    </Container>
  )
}
