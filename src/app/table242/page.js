"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '@/components/seatsMap'
import DataTable from '@/shadComponents/table242'

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
                                { candidate: "Sadiq Iftikhar", data: 185, fill: "hsl(var(--chart-1))" },
                                { candidate: "SYED MUSTAFA KAMAL", data: 101, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Polling Stations"
                                    },
                                    "Sadiq Iftikhar": {
                                        label: "Sadiq Iftikhar"
                                    },
                                    "SYED MUSTAFA KAMAL": {
                                        label: "SYED MUSTAFA KAMAL"
                                    }
                                }
                            } />
                            <PolllingStationPie
                            title="Votes Won By Candidates"
                            chartData={[
                                { candidate: "Sadiq Iftikhar", data: 54572, fill: "hsl(var(--chart-1))" },
                                { candidate: "SYED MUSTAFA KAMAL", data: 71806, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Votes"
                                    },
                                    "Sadiq Iftikhar": {
                                        label: "Sadiq Iftikhar"
                                    },
                                    "SYED MUSTAFA KAMAL": {
                                        label: "SYED MUSTAFA KAMAL"
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