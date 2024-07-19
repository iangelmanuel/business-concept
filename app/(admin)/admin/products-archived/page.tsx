import { getProductDeleted } from '@/actions'
import { ProductDeletedGrid } from '@/components'
import { titleFont } from '@/config'

export default async function ProductArchivedPage() {
  const productsDeleted = await getProductDeleted()

  const isEmptyTitleDescription =
    productsDeleted?.length === 0
      ? 'No hay productos archivados'
      : 'Productos archivados'

  return (
    <article>
      <h1 className={`${titleFont.className} mb-3 text-2xl font-bold`}>
        {isEmptyTitleDescription}
      </h1>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
        {productsDeleted?.length !== 0 ? (
          productsDeleted?.map((product) => (
            <ProductDeletedGrid
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            Realiza una compra y tendrás tus registros de ordenes en esta
            sección.
          </p>
        )}
      </section>
    </article>
  )
}
