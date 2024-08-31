"use client"

import * as React from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import data from './mergedData.json'

import BarChart from './barChart'

const tableData = data.map((d, i) => ({...d, index : i}))

const barChartData = tableData
    .map((d, i) => (
        {
            ...d,
            barData: [
                {
                    party: 'PTI',
                    votes: d.ptiVotes,
                    riggedVotes: 0
                },
                {
                    party: 'Non PTI',
                    votes: d.estVotes,
                    riggedVotes: d.riggingAdvantage
                }
            ]
        })
    )

console.log(barChartData)
console.log(data)

export const columns = [
    {
        accessorKey: "seat",
        header: "Seat",
        id: "seat",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("seat")}</div>
        ),
    },
    {
        accessorKey: "psno",
        header: "PS Number",
        id: "psno",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("psno")}</div>
        ),
    },
    {
        accessorKey: "name",
        id: "ps",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Polling Station
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="pl-2 capitalize">{row.getValue("ps")}</div>,
    },
    {
        accessorKey: "turnout",
        id: "turnout",
        header: () => <div className="">Turnout</div>,
        cell: ({ row }) => {
            const amount = parseInt(row.getValue("turnout"))

            return <div className="font-medium">{amount}</div>
        },
    },
    {
        accessorKey: "riggingAdvantage",
        id: "riggingAdvantage",
        header: () => <div className="">Rigging Advantage</div>,
        cell: ({ row }) => {
            const amount = parseInt(row.getValue("riggingAdvantage"))

            return <div className="font-medium">{amount}</div>
        },
    },
    /*{
        header: () => <div className="">Votes Breakdown</div>,
        id: "barChart",
        cell: ({row}) => {
            console.log(row)
            return (
                <div className="font-medium">
                    <BarChart
                        data={row.original.barData}
                        dataKeys={['votes', 'riggedVotes']}
                        yKey="party"
                    />
                </div>
            )
        },
    },*/
]

export default function DataTableDemo() {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter Polling Stations..."
                    value={(table.getColumn("ps")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("ps")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}