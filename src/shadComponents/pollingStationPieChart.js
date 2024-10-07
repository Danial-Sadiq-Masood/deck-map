"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

export default function Component({chartData, chartConfig, title}) {
  return (
    <Card className="flex flex-col min-w-[315px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip formatter={(val,name) => `${name} : ${val}`} content={<ChartTooltipContent nameKey="candidate" hideLabel />} />
            <Pie data={chartData} dataKey="data" nameKey="candidate" />
            <ChartLegend
              content={<ChartLegendContent nameKey="candidate" formatter={(val,name) => `${name}`} />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      </CardFooter>
    </Card>
  )
}

