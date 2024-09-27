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

import Paginator from './table-components/paginator'
import ColumnHeader from './table-components/columnHeader'

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

import data from './turnout.json'

import pattan from './pattan.json'

import na130tbl from './130tblfixed.json'

import BarChart from './barChart'

const pattanMap = pattan.reduce((acc,d)=>{
    acc[d.psno] = d
    return acc;
}, {});

const tableData = data.map((d, i) => (
    {
        ...d,
        ecpPercentageTurnout: ((d.ecp_turnout/ d.registered) * 100),
        ptiPercentageTurnout: ((d.pti_turnout/ d.registered) * 100)
    }))
    //.filter(d => pattanMap[d.ps])

console.log(tableData, 'table data');

tableData.forEach(d => {
    if(!pattanMap[d.psno]){
        return;
    }
    d.pattanNaTurnout = pattanMap[d.psno]['NA-128 Turnout'] || NaN;
    d.pattanPaTurnout = pattanMap[d.psno]['5/PPs Turnout'] || NaN;
});

console.log(pattanMap);

export const columns = [
    {
        accessorKey: "psno",
        header: ({ column }) => <ColumnHeader column={column} title="PS Number" />,
        id: "psno",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("psno")}</div>
        ),
        enableSorting: true
    },
    {
        accessorKey: "Polling Station Name",
        id: "ps",
        size: 300,
        header: ({ column }) => <ColumnHeader column={column} title="Polling Station Name" />,
        cell: ({ row }) => <div className="capitalize">{row.getValue("ps")}</div>,
        enableSorting: false
    },
    {
        accessorKey: "Total Voters",
        id: "registered",
        header: ({ column }) => <ColumnHeader column={column} title="Registered Voters" />,
        cell: ({ row }) => {
            const amount = parseInt(row.getValue("registered"))

            return <div className="font-medium">{amount}</div>
        },
        enableSorting: true
    },
    {
        accessorKey: "turnout",
        id: "turnout",
        header: ({ column }) => <ColumnHeader column={column} title="NA Turnout" />,
        cell: ({ row }) => {
            const amount = parseInt(row.getValue("turnout"))

            return <div className="font-medium">{amount}</div>
        },
        enableSorting: true
    },
    {
        accessorKey: "turnout_percent",
        id: "ecpPercentageTurnout",
        header: ({ column }) => <ColumnHeader column={column} title="Turnout Percentage" />,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("ecpPercentageTurnout")) *100

            return <div className="font-medium">{amount.toFixed(2)} %</div>
        },
        enableSorting: true
    },
    {
        accessorKey: "winner",
        header: ({ column }) => <ColumnHeader column={column} title="ECP Winner" />,
        id: "ecp_winner",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("ecp_winner")}</div>
        ),
        enableSorting: true
    }/*,
    {
        accessorKey: "pti_turnout",
        id: "pti_turnout",
        header: ({ column }) => <ColumnHeader column={column} title="PTI Turnout" />,
        cell: ({ row }) => {
            const amount = parseInt(row.getValue("pti_turnout"))

            return <div className="font-medium">{amount}</div>
        },
        enableSorting: true
    },
    {
        accessorKey: "ptiPercentageTurnout",
        id: "ptiPercentageTurnout",
        header: ({ column }) => <ColumnHeader column={column} title="PTI Turnout Percentage" />,
        cell: ({ row }) => {
            const amount = parseInt(row.getValue("ptiPercentageTurnout"))

            return <div className="font-medium">{amount.toFixed(2)} %</div>
        },
        enableSorting: true
    },
    {
        accessorKey: "pti_winner",
        header: ({ column }) => <ColumnHeader column={column} title="PTI Winner" />,
        id: "pti_winner",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("pti_winner")}</div>
        ),
        enableSorting: true
    }
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
    }*/
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
        data : na130tbl,
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
        }
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter Polling Stations By Name..."
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
                                    const minSize = header.getSize() || 20;
                                    return ( 
                                        <TableHead key={header.id} className="max-w-[50%] min-w-[10px]" stylekey={header.id}>
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
                        {table?.getRowModel()?.rows?.length ? (
                            table?.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="max-w-[500px] align-top" key={cell.id}>
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
                <Paginator table={table} />
            </div>
        </div>
    )
}
