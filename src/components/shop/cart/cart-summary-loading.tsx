import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const CartSummaryLoading = () => {
  return (
    <article className="order-1 mt-10 lg:order-2">
      <Card className="sticky top-0">
        <CardHeader>
          <Skeleton className="mb-3 h-5 w-3/4" />
        </CardHeader>

        <CardContent>
          <section className="space-y-5">
            <div className="flex justify-between">
              <Skeleton className="mb-3 h-5 w-2/6" />
              <Skeleton className="mb-3 h-5 w-2/6" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="mb-3 h-5 w-2/6" />
              <Skeleton className="mb-3 h-5 w-3/6" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="mb-3 h-5 w-2/6" />
              <Skeleton className="mb-3 h-5 w-2/6" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="mb-3 h-5 w-2/6" />
              <Skeleton className="mb-3 h-5 w-1/6" />
            </div>
          </section>
        </CardContent>

        <CardFooter>
          <Skeleton className="mb-3 h-10 w-full" />
        </CardFooter>
      </Card>
    </article>
  )
}
