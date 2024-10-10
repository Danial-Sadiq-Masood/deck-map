"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '@/components/seatsMap'
import DataTable from '@/shadComponents/table128comp'

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
                    <CardTitle className="text-2xl">Polling Station Turnout Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable />
                </CardContent>
            </Card>
        </div>
    )
}

export default HomePage