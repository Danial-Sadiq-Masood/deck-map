"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "February", desktop: 305, mobile: 200 }
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
}

export default function Component({ data, yKey, dataKeys }) {
    return (
        <Card className="p-2 pt-[20px] pr-[20px]">
            <ChartContainer className="min-h-[100px] w-[250px]" config={chartConfig}>
                <BarChart layout="vertical" data={data}
                    margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                >
                    <CartesianGrid vertical={true} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey={yKey} />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Bar isAnimationActive={false}
                        dataKey={dataKeys[0]}
                        fill="var(--color-desktop)"
                        radius={0}
                        barSize={20}
                        stackId='a'
                    />
                    <Bar isAnimationActive={false}
                        dataKey={dataKeys[1]}
                        fill="var(--color-mobile)"
                        radius={[0, 5, 5, 0]}
                        barSize={20}
                        stackId='a'
                    />
                </BarChart>
            </ChartContainer>
        </Card>
    )
}
