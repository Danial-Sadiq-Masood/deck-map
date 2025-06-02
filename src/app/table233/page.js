"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '@/components/seatsMap'
import DataTable from '@/shadComponents/table233'

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
                                { candidate: "Muhammad Haris PTI", data: 214, fill: "hsl(var(--chart-1))" },
                                { candidate: "Muhammad Javaid Hanif MQM", data: 17, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Polling Stations"
                                    },
                                    "Muhammad Haris PTI": {
                                        label: "Muhammad Haris PTI"
                                    },
                                    "Muhammad Javaid Hanif MQM": {
                                        label: "Muhammad Javaid Hanif MQM"
                                    }
                                }
                            } />
                            <PolllingStationPie
                            title="Votes Won By Candidates"
                            chartData={[
                                { candidate: "Muhammad Haris PTI", data: 59626, fill: "hsl(var(--chart-1))" },
                                { candidate: "Muhammad Javaid Hanif MQM", data: 105524, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Votes"
                                    },
                                    "Muhammad Haris PTI": {
                                        label: "Muhammad Haris PTI"
                                    },
                                    "Muhammad Javaid Hanif MQM": {
                                        label: "Muhammad Javaid Hanif MQM"
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