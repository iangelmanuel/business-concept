import { Card, CardContent, CardFooter, Skeleton } from '@/components'

const cart = [1, 2, 3, 4, 5, 6]

export const CartItemsLoading = () => {
  return (
    <Card className="mx-auto w-4/6 px-5 py-7 flex flex-col justify-center">
      <Skeleton className="h-5 w-3/4 mb-3" />

      <section className="space-y-5">
        {cart.map((item) => (
          <Card
            key={item}
            className="p-6"
          >
            <article className="flex justify-between items-center">
              <section className="flex items-center gap-x-5">
                <Skeleton className="h-24 w-24" />
                <div>
                  <Skeleton className="h-5 w-full mb-3" />
                  <div className="flex gap-x-2 text-gray-500 text-xs">
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

              <CardFooter className="p-0 flex flex-col justify-center items-center">
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
      </section>
    </Card>
  )
}
