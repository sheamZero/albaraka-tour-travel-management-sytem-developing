
"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export function DataTable({ columns, data, loading }) {
// console.log("COLUMNS:", columns);
// console.log("DATA:", data);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (

        <div className="rounded-md border">

            <Table>

                <TableHeader>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="bg-primary hover:bg-primary border-none "
                            >
                                {
                                    headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="bg-primary py-3 font-semibold text-lg text-white **:text-center"
                                        >
                                            {
                                                flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }
                                        </TableHead>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableHeader>

                <TableBody>

                    {
                        loading ? (
                            [...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    {columns.map((_, i) => (
                                        <TableCell key={i}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                    ))}

                                </TableRow>
                            ))
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow  key={row.id}>

                                    {
                                        row.getVisibleCells().map((cell) => (
                                            <TableCell className={"py-3 text-sm text-text"} key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))
                                    }

                                </TableRow>
                            ))

                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No user available.
                                </TableCell>
                            </TableRow>
                        )
                    }

                </TableBody>

            </Table>

        </div>

    )
}