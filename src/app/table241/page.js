"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '@/components/seatsMap'
import DataTable from '@/shadComponents/table241'

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
                                { candidate: "Khurram Sher Zaman", data: 106, fill: "hsl(var(--chart-1))" },
                                { candidate: "Mirza Ikhtiar Baig", data: 129, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Polling Stations"
                                    },
                                    "Khurram Sher Zaman": {
                                        label: "Khurram Sher Zaman"
                                    },
                                    "Mirza Ikhtiar Baig": {
                                        label: "Mirza Ikhtiar Baig"
                                    }
                                }
                            } />
                            <PolllingStationPie
                            title="Votes Won By Candidates"
                            chartData={[
                                { candidate: "Khurram Sher Zaman", data: 49550, fill: "hsl(var(--chart-1))" },
                                { candidate: "Mirza Ikhtiar Baig", data: 53351, fill: "hsl(var(--chart-2))" }
                            ]}
                            chartConfig={
                                {
                                    data: {
                                        label: "Votes"
                                    },
                                    "Khurram Sher Zaman": {
                                        label: "Khurram Sher Zaman"
                                    },
                                    "Mirza Ikhtiar Baig": {
                                        label: "Mirza Ikhtiar Baig"
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