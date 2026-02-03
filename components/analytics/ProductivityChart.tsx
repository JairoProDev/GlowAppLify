"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
    { name: "Mon", score: 40 },
    { name: "Tue", score: 65 },
    { name: "Wed", score: 55 },
    { name: "Thu", score: 80 },
    { name: "Fri", score: 75 },
    { name: "Sat", score: 90 },
    { name: "Sun", score: 85 },
]

export function ProductivityChart() {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Weekly Productivity Score</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#1E88E5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "var(--background)",
                                    borderColor: "var(--border)",
                                    borderRadius: "8px"
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke="#1E88E5"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorScore)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
