import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton
} from '@/components'

export const CardSummaryLoading = () => {
  return (
    <article className="col-span-1">
      <Card>
        <CardHeader>
          <Skeleton className="w-40 h-5" />
          <Skeleton className="w-80 h-5" />
        </CardHeader>

        <CardContent>
          <article className="flex flex-col">
            <Skeleton className="w-40 h-5 mb-3" />
            <section className="mb-3">
              <div className="flex justify-between mb-2">
                <Skeleton className="w-16 h-5" />
                <Skeleton className="w-28 h-5" />
              </div>

              <div className="flex justify-between mb-2">
                <Skeleton className="w-24 h-5" />
                <Skeleton className="w-36 h-5" />
              </div>

              <div className="flex justify-between mb-2">
                <Skeleton className="w-24 h-5" />
                <Skeleton className="w-28 h-5" />
              </div>

              <div className="flex justify-between mb-2">
                <Skeleton className="w-28 h-5" />
                <Skeleton className="w-36 h-5" />
              </div>

              <div className="flex justify-between mb-2">
                <Skeleton className="w-20 h-5" />
                <Skeleton className="w-28 h-5" />
              </div>

              <div className="flex justify-between mb-2">
                <Skeleton className="w-36 h-5" />
                <Skeleton className="w-36 h-5" />
              </div>

              <div className="flex justify-between mb-2">
                <Skeleton className="w-28 h-5" />
                <Skeleton className="w-28 h-5" />
              </div>

              <div className="flex justify-between mb-2">
                <Skeleton className="w-36 h-5" />
                <Skeleton className="w-36 h-5" />
              </div>
            </section>

            <Skeleton className="w-40 h-5 mb-3" />
            <section className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="w-24 h-5" />
                <Skeleton className="w-28 h-5" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="w-28 h-5" />
                <Skeleton className="w-24 h-5" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="w-24 h-5" />
                <Skeleton className="w-28 h-5" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="w-20 h-5" />
                <Skeleton className="w-24 h-5" />
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
