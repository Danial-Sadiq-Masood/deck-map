"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import data from './turnout.json'

const stationsData = data.reduce((acc,d)=>{
    if(d.ptiWinnerParty === 'PTI'){
        acc.pti.ptiWins += 1
    }else{
        acc.pti.estWins += 1
    }
    if(d.ecpWinnerParty === 'PTI'){
        acc.est.ptiWins += 1
    }else{
        acc.est.estWins += 1
    }
    return acc;
}, {pti : {ptiWins : 0, estWins : 0}, est : {ptiWins : 0, estWins : 0}})

console.log(stationsData)

const pollingChartData = {
    pti : [
        {winner : 'PTI', stationsWon : stationsData.pti.ptiWins, fill : "hsl(var(--chart-1))"},
        {winner : 'IPP', stationsWon : stationsData.pti.estWins, fill : "hsl(var(--chart-2))"}  
    ],
    est : [
        {winner : 'PTI', stationsWon : stationsData.est.ptiWins, fill : "hsl(var(--chart-1))"},
        {winner : 'IPP', stationsWon : stationsData.est.estWins, fill : "hsl(var(--chart-2))"}  
    ],
}

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  stationsWon : {
    label: "Stations Won",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export default function Component({title, chartKey}) {
  return (
    <Card className>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[8rem] max-w-[20rem]" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={pollingChartData[chartKey]}
            layout="vertical"
            margin={{
              left: 0,
            }}
            barSize={30}
          >
            <YAxis
              dataKey="winner"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="stationsWon" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="stationsWon" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

