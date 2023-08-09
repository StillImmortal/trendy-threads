import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/custom"

export default function StoresLoading() {
  return (
    <>
      <PageHeader title="Stores" description="Manage your stores" size="sm" />
      <Card className="flex space-x-4 px-4 py-3">
        <Skeleton className="mt-2 h-4 w-4 rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="block h-4 w-full md:hidden" />
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="h-full">
            <AspectRatio ratio={21 / 9}>
              <Skeleton className="h-full w-full" />
            </AspectRatio>
            <CardHeader className="flex-1">
              <Skeleton className="h-5 w-3/5" />
              <Skeleton className="h-4 w-4/5" />
            </CardHeader>
            <CardContent className="mt-5">
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
