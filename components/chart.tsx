"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartData = [
  { date: "2024-04-01", loaned: 222, borrowed: 150 },
  { date: "2024-04-02", loaned: 97, borrowed: 180 },
  { date: "2024-04-03", loaned: 167, borrowed: 120 },
  { date: "2024-04-04", loaned: 242, borrowed: 260 },
  { date: "2024-04-05", loaned: 373, borrowed: 290 },
  { date: "2024-04-06", loaned: 301, borrowed: 340 },
  { date: "2024-04-07", loaned: 245, borrowed: 180 },
  { date: "2024-04-08", loaned: 409, borrowed: 320 },
  { date: "2024-04-09", loaned: 59, borrowed: 110 },
  { date: "2024-04-10", loaned: 261, borrowed: 190 },
  { date: "2024-04-11", loaned: 327, borrowed: 350 },
  { date: "2024-04-12", loaned: 292, borrowed: 210 },
  { date: "2024-04-13", loaned: 342, borrowed: 380 },
  { date: "2024-04-14", loaned: 137, borrowed: 220 },
  { date: "2024-04-15", loaned: 120, borrowed: 170 },
  { date: "2024-04-16", loaned: 138, borrowed: 190 },
  { date: "2024-04-17", loaned: 446, borrowed: 360 },
  { date: "2024-04-18", loaned: 364, borrowed: 410 },
  { date: "2024-04-19", loaned: 243, borrowed: 180 },
  { date: "2024-04-20", loaned: 89, borrowed: 150 },
  { date: "2024-04-21", loaned: 137, borrowed: 200 },
  { date: "2024-04-22", loaned: 224, borrowed: 170 },
  { date: "2024-04-23", loaned: 138, borrowed: 230 },
  { date: "2024-04-24", loaned: 387, borrowed: 290 },
  { date: "2024-04-25", loaned: 215, borrowed: 250 },
  { date: "2024-04-26", loaned: 75, borrowed: 130 },
  { date: "2024-04-27", loaned: 383, borrowed: 420 },
  { date: "2024-04-28", loaned: 122, borrowed: 180 },
  { date: "2024-04-29", loaned: 315, borrowed: 240 },
  { date: "2024-04-30", loaned: 454, borrowed: 380 },
  { date: "2024-05-01", loaned: 165, borrowed: 220 },
  { date: "2024-05-02", loaned: 293, borrowed: 310 },
  { date: "2024-05-03", loaned: 247, borrowed: 190 },
  { date: "2024-05-04", loaned: 385, borrowed: 420 },
  { date: "2024-05-05", loaned: 481, borrowed: 390 },
  { date: "2024-05-06", loaned: 498, borrowed: 520 },
  { date: "2024-05-07", loaned: 388, borrowed: 300 },
  { date: "2024-05-08", loaned: 149, borrowed: 210 },
  { date: "2024-05-09", loaned: 227, borrowed: 180 },
  { date: "2024-05-10", loaned: 293, borrowed: 330 },
  { date: "2024-05-11", loaned: 335, borrowed: 270 },
  { date: "2024-05-12", loaned: 197, borrowed: 240 },
  { date: "2024-05-13", loaned: 197, borrowed: 160 },
  { date: "2024-05-14", loaned: 448, borrowed: 490 },
  { date: "2024-05-15", loaned: 473, borrowed: 380 },
  { date: "2024-05-16", loaned: 338, borrowed: 400 },
  { date: "2024-05-17", loaned: 499, borrowed: 420 },
  { date: "2024-05-18", loaned: 315, borrowed: 350 },
  { date: "2024-05-19", loaned: 235, borrowed: 180 },
  { date: "2024-05-20", loaned: 177, borrowed: 230 },
  { date: "2024-05-21", loaned: 82, borrowed: 140 },
  { date: "2024-05-22", loaned: 81, borrowed: 120 },
  { date: "2024-05-23", loaned: 252, borrowed: 290 },
  { date: "2024-05-24", loaned: 294, borrowed: 220 },
  { date: "2024-05-25", loaned: 201, borrowed: 250 },
  { date: "2024-05-26", loaned: 213, borrowed: 170 },
  { date: "2024-05-27", loaned: 420, borrowed: 460 },
  { date: "2024-05-28", loaned: 233, borrowed: 190 },
  { date: "2024-05-29", loaned: 78, borrowed: 130 },
  { date: "2024-05-30", loaned: 340, borrowed: 280 },
  { date: "2024-05-31", loaned: 178, borrowed: 230 },
  { date: "2024-06-01", loaned: 178, borrowed: 200 },
  { date: "2024-06-02", loaned: 470, borrowed: 410 },
  { date: "2024-06-03", loaned: 103, borrowed: 160 },
  { date: "2024-06-04", loaned: 439, borrowed: 380 },
  { date: "2024-06-05", loaned: 88, borrowed: 140 },
  { date: "2024-06-06", loaned: 294, borrowed: 250 },
  { date: "2024-06-07", loaned: 323, borrowed: 370 },
  { date: "2024-06-08", loaned: 385, borrowed: 320 },
  { date: "2024-06-09", loaned: 438, borrowed: 480 },
  { date: "2024-06-10", loaned: 155, borrowed: 200 },
  { date: "2024-06-11", loaned: 92, borrowed: 150 },
  { date: "2024-06-12", loaned: 492, borrowed: 420 },
  { date: "2024-06-13", loaned: 81, borrowed: 130 },
  { date: "2024-06-14", loaned: 426, borrowed: 380 },
  { date: "2024-06-15", loaned: 307, borrowed: 350 },
  { date: "2024-06-16", loaned: 371, borrowed: 310 },
  { date: "2024-06-17", loaned: 475, borrowed: 520 },
  { date: "2024-06-18", loaned: 107, borrowed: 170 },
  { date: "2024-06-19", loaned: 341, borrowed: 290 },
  { date: "2024-06-20", loaned: 408, borrowed: 450 },
  { date: "2024-06-21", loaned: 169, borrowed: 210 },
  { date: "2024-06-22", loaned: 317, borrowed: 270 },
  { date: "2024-06-23", loaned: 480, borrowed: 530 },
  { date: "2024-06-24", loaned: 132, borrowed: 180 },
  { date: "2024-06-25", loaned: 141, borrowed: 190 },
  { date: "2024-06-26", loaned: 434, borrowed: 380 },
  { date: "2024-06-27", loaned: 448, borrowed: 490 },
  { date: "2024-06-28", loaned: 149, borrowed: 200 },
  { date: "2024-06-29", loaned: 103, borrowed: 160 },
  { date: "2024-06-30", loaned: 446, borrowed: 400 },
];

const chartConfig = {
  views: {
    label: "Transactions",
  },
  loaned: {
    label: "loaned",
    color: "hsl(var(--chart-1))",
  },
  borrowed: {
    label: "borrowed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DashboardChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("loaned");

  const total = React.useMemo(
    () => ({
      loaned: chartData.reduce((acc, curr) => acc + curr.loaned, 0),
      borrowed: chartData.reduce((acc, curr) => acc + curr.borrowed, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["loaned", "borrowed"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
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
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
