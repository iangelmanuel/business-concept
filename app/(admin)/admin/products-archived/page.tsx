import type { Metadata } from 'next'
import { getProductDeleted } from '@/actions'
import { ProductDeletedGrid } from '@/components'
import { titleFont } from '@/config'

export const metadata: Metadata = {
  title: 'Business Concept - Productos Archivados',
  description: 'Administra los productos archivados de la tienda',
  keywords:
    'business concept, tienda online, productos, calidad, precios accesibles',
  robots: 'noindex, nofollow'
}

export default async function ProductArchivedPage() {
  const productArchived = await getProductDeleted()

  const isEmptyTitleDescription =
    productArchived?.length === 0
      ? 'No hay productos archivados'
      : 'Productos archivados'

  return (
    <article>
      <h1 className={`${titleFont.className} mb-3 text-2xl font-bold`}>
        {isEmptyTitleDescription}
      </h1>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
        {productArchived?.length !== 0 ? (
          productArchived?.map((product) => (
            <ProductDeletedGrid
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No has archivado ningún producto.
          </p>
        )}
      </section>
    </article>
  )
}
