import { Footer, Header } from "@/components"

export const metadata = {
  title: "Business Concept",
  description:
    "Descubre todos los productos que tenemos en Business Concept. Desde productos de limpieza, hasta productos de oficina. ¡Descubre todo lo que tenemos para ti!",
  keywords:
    "productos, tienda online, business concept, compra, venta, articulo, producto en venta, producto en stock, producto en oferta, producto en promoción, producto en descuento, producto en liquidación, producto en rebaja, producto en preventa, producto en preventa, producto en lanzamiento, producto en novedad, producto en tendencia, producto en moda, producto en stock, producto en agotado, producto en existencia, producto en inventario, producto en bodega, producto en almacén, producto en depósito, producto en stock, producto en oferta, producto en promoción, producto en descuento, producto en liquidación, producto en rebaja, producto en preventa, producto en preventa, producto en lanzamiento, producto en novedad, producto en tendencia, producto en moda, producto en stock, producto en agotado, producto en existencia, producto en inventario, producto en bodega, producto en almacén, producto en depósito, producto en stock, producto en oferta, producto en promoción, producto en descuento, producto en liquidación, producto en rebaja, producto en preventa, producto en preventa, producto en lanzamiento, producto en novedad, producto en tendencia, producto en moda, producto en stock, producto en agotado, producto en existencia, producto en inventario, producto en bodega, producto en almacén, producto en depósito, producto en stock, producto en oferta, producto en promoción, producto en descuento, producto en liquidación, producto en rebaja, producto en preventa, producto en preventa, producto en lanzamiento, producto en novedad, producto en tendencia, producto en moda, producto en stock, producto en agotado, producto en existencia, producto en inventario, producto en bodega, producto en almacén, producto en depósito, producto en stock, producto en oferta, producto en promoción, producto en descuento, producto en liquidación, producto en rebaja, producto en preventa, producto en preventa, producto en lanzamiento, producto en novedad, producto en tendencia, producto en moda, producto en stock, producto en agotado, producto en existencia, producto en inventario, producto en bodega, producto en almacén, producto en depósito, producto en stock,",
  robots: "index, follow"
}

export default function ShopLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
