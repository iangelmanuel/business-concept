import { Card, CardContent, CardHeader, Skeleton } from '@/components'

const cart = [1, 2, 3, 4, 5]

export const CardItemsLoading = () => {
  return (
    <Card className="order-2 mt-10 lg:order-1 lg:col-span-2">
      <CardHeader>
        <Skeleton className="h-5 w-20 md:w-40" />
        <Skeleton className="h-5 w-28 md:w-80" />
      </CardHeader>

      <CardContent>
        <article>
          <section className="mt-4 space-y-3">
            <div>
              <Skeleton className="mb-3 h-5 w-28 md:w-40" />
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li key={item}>
                    <Card className="p-6">
                      <section className="flex flex-col items-center justify-between md:flex-row">
                        <article className="mb-2 flex flex-col items-center md:flex-row md:gap-x-5">
                          <Skeleton className="mb-1 h-16 w-16" />
                          <div>
                            <Skeleton className="h-5 w-20" />
                          </div>
                        </article>

                        <CardContent className="flex flex-col items-center justify-center p-0">
                          <Skeleton className="h-5 w-20" />
                        </CardContent>
                      </section>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </CardContent>
    </Card>
  )
}
