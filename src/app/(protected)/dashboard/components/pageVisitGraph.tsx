"use client";

import { Line, LabelList, LineChart, CartesianGrid, XAxis, XAxisProps } from "recharts";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const chartConfig = {
  views: {
    label: "overall",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function PageVisitGraph({ className, data }: { className?: string, data: any }) {
  const [ chartData, setChartData ] = useState(data);
  console.log(JSON.stringify(chartData));

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Visitor Analytics</CardTitle>
          <CardDescription>Analytics of last 10 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-[202px] w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                padding={{ left: 1 }}
                {...({} as XAxisProps)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-views)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
