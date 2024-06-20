import { Card, CardContent, CardHeader, Skeleton } from '@/components'

const cart = [1, 2, 3, 4, 5, 6]

export const CardItemsLoading = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <Skeleton className="w-40 h-5" />
        <Skeleton className="w-80 h-5" />
      </CardHeader>

      <CardContent>
        <article>
          <section className="mt-4 space-y-3">
            <div>
              <Skeleton className="w-40 h-5 mb-3" />
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li key={item}>
                    <Card className="p-6">
                      <section className="flex justify-between items-center">
                        <article className="flex items-center gap-x-5">
                          <Skeleton className="w-20 h-20" />
                          <div>
                            <Skeleton className="w-20 h-5" />
                          </div>
                        </article>

                        <CardContent className="p-0 flex flex-col justify-center items-center">
                          <Skeleton className="w-20 h-5" />
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
