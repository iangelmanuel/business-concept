export function formatCurrency(price: number) {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
  return `${formatter} COP`
}
