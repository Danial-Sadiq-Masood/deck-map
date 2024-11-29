"use client"

import { BellIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

const turnOutData = [
    {
        party: 'PML-N',
        turnout: 450
    },
    {
        party: 'IPP',
        turnout: 425
    },
    {
        party: 'PTI',
        turnout: 259
    }
]

export default function CardDemo({ className, ...props }) {
    return (
        <Card className={cn("w-full p-2 min-w-[300px] h-fit", className)} {...props}>
            <CardContent className="p-2 grid gap-2">
                <div className=" flex flex-col items-center space-x-4 rounded-md border p-4">
                    <div className="flex gap-3 flex-col">
                        {
                            props.toggles
                                .map((d, i) => (
                                    <div key={i} className="flex items-start space-x-2">
                                        <Switch onCheckedChange={(checked) => d[1](checked)} checked={d[0]} id="toggle-pti" />
                                        <Label htmlFor="airplane-mode">{d[2]}</Label>
                                    </div>
                                ))
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-0 items-stretch rounded-md border">
                    <div className=" flex items-center gap-2 border-b">
                        <div className="shrink-0 h-[40px] w-[40px] bg-[#5270d1]">
                        </div>
                        <p className="text-xs italic">
                            NA-SEAT
                        </p>
                    </div>
                    <div className=" flex items-center gap-2">
                        <div className="shrink-0 h-[40px] w-[40px] bg-[#d76e48]">
                        </div>
                        <p className="text-xs italic">
                            PP-SEAT
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}