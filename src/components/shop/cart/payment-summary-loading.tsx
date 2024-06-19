import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton
} from '@/components'

export const PaymentSummaryLoading = () => {
  return (
    <>
      <Card className="mx-auto w-2/6 p-2 h-[440px] sticky top-0">
        <CardHeader>
          <Skeleton className="h-5 w-3/4 mb-3" />
        </CardHeader>

        <CardContent>
          <section className="space-y-5">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-2/6 mb-3" />
              <Skeleton className="h-5 w-2/6 mb-3" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="h-5 w-2/6 mb-3" />
              <Skeleton className="h-5 w-3/6 mb-3" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="h-5 w-2/6 mb-3" />
              <Skeleton className="h-5 w-2/6 mb-3" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="h-5 w-2/6 mb-3" />
              <Skeleton className="h-5 w-1/6 mb-3" />
            </div>
          </section>
        </CardContent>

        <CardFooter>
          <Skeleton className="h-10 w-full mb-3" />
        </CardFooter>
      </Card>
    </>
  )
}
