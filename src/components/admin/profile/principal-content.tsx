"use client"

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type ChartConfig } from "@/components"
import { titleFont } from "@/config"
import type { AdminDashboard } from "@/types"
import { capitalize } from "@/utils"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

interface Props {
  data: AdminDashboard[] | null
}

const chartConfig = {
  total: {
    label: "Total",
    color: "#2563eb"
  }
} satisfies ChartConfig

export const PrincipalContent = ({ data }: Props) => {
  const crudData = data
    ?.filter((item) => item.paidAt !== null)
    .map((item) => {
      const month = new Date(item.paidAt!).toLocaleString("es-CO", {
        month: "long"
      })

      return {
        month: capitalize(month),
        total: item.total - item.discount
      }
    })

  const chartData = crudData?.reduce<typeof crudData>((acc, item) => {
    const existing = acc.find((i) => i?.month === item?.month)

    if (existing) {
      existing.total += item?.total ?? 0
    } else {
      acc.push(item)
    }

    return acc
  }, [])

  return (
    <article>
      <Card>
        <CardHeader>
          <h2 className={`${titleFont.className} text-xl font-bold`}>
            Ventas mensuales
          </h2>
          <CardDescription>Total de ventas en el mes</CardDescription>
        </CardHeader>

        <CardContent className="min-h-80">
          <ChartContainer
            config={chartConfig}
            className="h-72 w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="total"
                fill="var(--color-total)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </article>
  )
}
