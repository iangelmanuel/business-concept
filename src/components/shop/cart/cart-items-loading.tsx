import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton
} from "@/components"

const cart = [1, 2, 3, 4, 5]

export const CartItemsLoading = () => {
  return (
    <Card className="order-2 mt-10 lg:order-1 lg:col-span-2">
      <CardHeader>
        <Skeleton className="mb-3 h-5 w-3/4" />
      </CardHeader>

      <CardContent className="space-y-5">
        {cart.map((item) => (
          <Card
            key={item}
            className="p-6"
          >
            <article className="flex flex-col items-center justify-between md:flex-row">
              <section className="flex flex-col items-center md:flex-row md:gap-x-5">
                <Skeleton className="h-16 w-16" />
                <div>
                  <Skeleton className="mb-3 h-5 w-full" />
                  <div className="flex gap-x-2 text-xs text-gray-500">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </section>

              <CardContent>
                <Card className="flex items-center gap-x-5 px-5 py-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-3/6" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </Card>
              </CardContent>

              <CardFooter className="flex flex-col items-center justify-center p-0">
                <section className="mb-3">
                  <Skeleton className="h-5 w-20" />
                </section>
                <section className="flex gap-x-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-5" />
                </section>
              </CardFooter>
            </article>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
