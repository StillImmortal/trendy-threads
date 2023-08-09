import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/custom"
import { SectionHeader } from "@/components/layout"

export default function AccountLoading() {
  return (
    <Container variant="sidebar">
      <SectionHeader
        title="Account"
        description="Manage your account settings"
        size="sm"
      />
      <div className="grid gap-10 rounded-lg border p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
      </div>
    </Container>
  )
}
