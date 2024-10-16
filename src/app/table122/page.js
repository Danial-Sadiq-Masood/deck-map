"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '@/components/seatsMap'
import DataTable from '@/shadComponents/table122'

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
                                { candidate: "Latif Khosa", data: 283, fill: "hsl(var(--chart-1))" },
                                { candidate: "Khwaja Saad Rafique", data: 75, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Polling Stations"
                                    },
                                    "Latif Khosa": {
                                        label: "Latif Khosa"
                                    },
                                    "Khwaja Saad Rafique": {
                                        label: "Khwaja Saad Rafique"
                                    }
                                }
                            } />
                            <PolllingStationPie
                            title="Votes Won By Candidates"
                            chartData={[
                                { candidate: "Latif Khosa", data: 117688, fill: "hsl(var(--chart-1))" },
                                { candidate: "Khwaja Saad Rafique", data: 77797, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Votes"
                                    },
                                    "Latif Khosa": {
                                        label: "Latif Khosa"
                                    },
                                    "Khwaja Saad Rafique": {
                                        label: "Khwaja Saad Rafique"
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