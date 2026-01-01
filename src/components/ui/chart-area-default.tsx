"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"


const chartDataDemo = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  tiempo: {
    label: "tiempo",
    color: "var(--mh-gray)",
  },
} satisfies ChartConfig

type ChartAreaDefaultProps = {
  chartData?: any[];
  chartKeyName: string;
  chartValueName: string; 
  title: string
  fillColor: string;
  strokeColor: string;
}

export function ChartAreaDefault({chartData, chartKeyName, chartValueName, title, fillColor, strokeColor}:ChartAreaDefaultProps) {
  const chartDataset = chartData ?? chartDataDemo;
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartDataset}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={chartKeyName}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey={chartValueName}
              type="natural"
              fill={fillColor}
              fillOpacity={0.4}
              stroke={strokeColor}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
