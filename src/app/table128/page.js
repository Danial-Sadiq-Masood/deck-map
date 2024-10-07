"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '@/components/seatsMap'
import DataTable from '@/shadComponents/table128'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import PollingStationChart from '@/shadComponents/pollingStationChart'
import AvgTurnoutChart from '@/shadComponents/avgTurnoutChart'
import PolllingStationPie from '@/shadComponents/pollingStationPieChart'

const HomePage = () => {

    return (
        <div className="w-100 p-8">
            <Card>
                <CardHeader className="pb-3 gap-3">
                    <CardTitle className="text-2xl">Polling Station Votes Breakdown</CardTitle>
                    <div className='flex gap-4'>
                        <PolllingStationPie
                            title="Polling Stations Won By Candidates"
                            chartData={[
                                { candidate: "Salman Akram Raja", data: 263, fill: "hsl(var(--chart-1))" },
                                { candidate: "Muhammad Aun Saqlain Chaudhry", data: 170, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Polling Stations"
                                    },
                                    "Salman Akram Raja": {
                                        label: "Salman Akram Raja"
                                    },
                                    "Muhammad Aun Saqlain Chaudhry": {
                                        label: "Muhammad Aun Saqlain Chaudhry"
                                    }
                                }
                            } />
                            <PolllingStationPie
                            title="Votes Won By Candidates"
                            chartData={[
                                { candidate: "Salman Akram Raja", data: 158344, fill: "hsl(var(--chart-1))" },
                                { candidate: "Muhammad Aun Saqlain Chaudhry", data: 176333, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Votes"
                                    },
                                    "Salman Akram Raja": {
                                        label: "Salman Akram Raja"
                                    },
                                    "Muhammad Aun Saqlain Chaudhry": {
                                        label: "Muhammad Aun Saqlain Chaudhry"
                                    }
                                }
                            } />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable />
                </CardContent>
            </Card>
        </div>
    )
}

export default HomePage