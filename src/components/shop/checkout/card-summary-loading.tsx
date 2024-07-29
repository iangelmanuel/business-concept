import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton
} from "@/components"

export const CardSummaryLoading = () => {
  return (
    <article className="order-1 mt-10 lg:order-2">
      <Card className="md:sticky md:top-0">
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-80" />
        </CardHeader>

        <CardContent>
          <article className="flex flex-col">
            <Skeleton className="mb-3 h-5 w-40" />
            <section className="mb-3">
              <div className="mb-2 flex justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-28" />
              </div>

              <div className="mb-2 flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-36" />
              </div>

              <div className="mb-2 flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-28" />
              </div>

              <div className="mb-2 flex justify-between">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-36" />
              </div>

              <div className="mb-2 flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-28" />
              </div>

              <div className="mb-2 flex justify-between">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-5 w-36" />
              </div>

              <div className="mb-2 flex justify-between">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-28" />
              </div>

              <div className="mb-2 flex justify-between">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-5 w-36" />
              </div>
            </section>

            <Skeleton className="mb-3 h-5 w-40" />
            <section className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-28" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-24" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-28" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
            </section>
          </article>
        </CardContent>

        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </article>
  )
}
