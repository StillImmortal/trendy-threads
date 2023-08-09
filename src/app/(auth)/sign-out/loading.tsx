import { Skeleton } from "@/components/ui/skeleton"
import { Container, PageHeader } from "@/components/custom"

export default function SignOutLoading() {
  return (
    <Container className="max-w-xs">
      <PageHeader
        title="Sign out"
        description="Are you sure you want to sign out?"
        size="sm"
        className="text-center"
      />
      <div className="flex w-full items-center space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </Container>
  )
}
