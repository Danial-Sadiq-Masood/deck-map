"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

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
    votes : {
        label : 'Votes'
    },
    offset : {
        label : 'Test'
    },
    "Actual Votes" : {
        label: "Desktop"
    },
    "ECP Tampering" : {
        label: "Mobile"
    },
}


export default function Component({ data, colors, maxY }) {

    return (
        <Card className="p-2 pt-[20px] pr-[20px] max-w-[450px] flex justify-center">
            <ChartContainer className="min-h-[300px] w-[400px]" config={chartConfig}>
                <BarChart data={data}
                    margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                >
                    <CartesianGrid vertical={true} />
                    <YAxis type="number" domain={[0,maxY]}/>
                    <XAxis type="category" dataKey="name" />
                    <ChartTooltip content={<ChartTooltipContent labelKey="offset"  nameKey="name" hideIndicator hideLabel hide/>} />
                    <Bar isAnimationActive={false}
                        dataKey="offset"
                        fill="transparent"
                        barSize={20}
                        stackId='a'
                    />
                    <Bar isAnimationActive={false}
                        dataKey="votes"
                        barSize={40}
                        radius={[4,4,0,0]}
                        stackId='a'
                    >
                        {data.map((item, index) => {
                            return <Cell key={index} fill={colors[index]} />;
                        })}
                    </Bar>
                </BarChart>
            </ChartContainer>
        </Card>
    )
}
