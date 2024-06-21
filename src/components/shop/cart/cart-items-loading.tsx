import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton
} from '@/components'

const cart = [1, 2, 3, 4, 5]

export const CartItemsLoading = () => {
  return (
    <Card className="lg:col-span-2 mt-10 order-2 lg:order-1">
      <CardHeader>
        <Skeleton className="h-5 w-3/4 mb-3" />
      </CardHeader>

      <CardContent className="space-y-5">
        {cart.map((item) => (
          <Card
            key={item}
            className="p-6"
          >
            <article className="flex flex-col md:flex-row justify-between items-center">
              <section className="flex flex-col md:flex-row items-center md:gap-x-5">
                <Skeleton className="h-16 w-16" />
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
      </CardContent>
    </Card>
  )
}
