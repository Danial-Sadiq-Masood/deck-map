"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '@/components/seatsMap'
import DataTable from '@/shadComponents/table244'

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
                                { candidate: "DAWA KHAN SABIR", data: 62, fill: "hsl(var(--chart-1))" },
                                { candidate: "SYED MUSTAFA KAMAL", data: 69, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Polling Stations"
                                    },
                                    "DAWA KHAN SABIR": {
                                        label: "DAWA KHAN SABIR"
                                    },
                                    "SYED MUSTAFA KAMAL": {
                                        label: "SYED MUSTAFA KAMAL"
                                    }
                                }
                            } />
                            <PolllingStationPie
                            title="Votes Won By Candidates"
                            chartData={[
                                { candidate: "DAWA KHAN SABIR", data: 14274, fill: "hsl(var(--chart-1))" },
                                { candidate: "SYED MUSTAFA KAMAL", data: 19293, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Votes"
                                    },
                                    "DAWA KHAN SABIR": {
                                        label: "DAWA KHAN SABIR"
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