"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '@/components/seatsMap'
import DataTable from '@/shadComponents/table238'

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
                                { candidate: "Haleem Adil Sheikh", data: 100, fill: "hsl(var(--chart-1))" },
                                { candidate: "Sadiq Iftikhar", data: 192, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Polling Stations"
                                    },
                                    "Haleem Adil Sheikh": {
                                        label: "Haleem Adil Sheikh"
                                    },
                                    "Sadiq Iftikhar": {
                                        label: "Sadiq Iftikhar"
                                    }
                                }
                            } />
                            <PolllingStationPie
                            title="Votes Won By Candidates"
                            chartData={[
                                { candidate: "Haleem Adil Sheikh", data: 37362, fill: "hsl(var(--chart-1))" },
                                { candidate: "Sadiq Iftikhar", data: 55679, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Votes"
                                    },
                                    "Haleem Adil Sheikh": {
                                        label: "Haleem Adil Sheikh"
                                    },
                                    "Sadiq Iftikhar": {
                                        label: "Sadiq Iftikhar"
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