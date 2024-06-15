import { data } from '../src/data/seed/seed-data'
import { prisma } from '../src/lib/prisma/prisma-config'

async function main() {
  await prisma.orderAddress.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.orderAddress.deleteMany()
  await prisma.order.deleteMany()
  await prisma.user.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const { products, categories } = data

  const categoriesData = categories.map((name) => ({ name }))

  await prisma.category.createMany({ data: categoriesData })
  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce<Record<string, string>>(
    (map, category) => {
      map[category.name.toLocaleLowerCase()] = category.id.toString()
      return map
    },
    {}
  )

  products.forEach(async (product) => {
    const { images, type, ...rest } = product
    const dbProduct = await prisma.product.create({
      data: { ...rest, categoryId: Number(categoriesMap[type]) }
    })
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id
    }))
    await prisma.productImage.createMany({ data: imagesData })
  })

  console.log('Seed executed successfully')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
