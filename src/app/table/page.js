"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '@/components/seatsMap'
import DataTable from '@/shadComponents/tableWaterfall'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const HomePage = () => {

    return (
        <div className="w-100 p-8">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-2xl">Title</CardTitle>
                    <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable />
                </CardContent>
            </Card>
        </div>
    )
}

export default HomePage