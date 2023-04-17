import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { rankItem } from "@tanstack/match-sorter-utils";
import SoftBox from "components/UI/SoftBox";
import DataTableHeadCell from "./DataTableHeadCell";
import DataTableBodyCell from "./DataTableBodyCell";
import SoftTypography from "components/UI/SoftTypography";
import DebouncedFilter from "./DebouncedFilter";

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

export default function SoftDataTable({
  table: { rows, columns },
  FilterComponent,
  withSearchFilter = true,
  ...rest
}) {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <SoftBox>
      <SoftBox sx={{ display: "flex", justifyContent: "flex-end" }}>
        {withSearchFilter && (
          <DebouncedFilter
            value={globalFilter}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search all columns..."
            sx={{ mx: 2, mb: 2 }}
          />
        )}
      </SoftBox>
      <SoftBox>{rest.isLoading && <LinearProgress color="error" />}</SoftBox>
      <TableContainer>
        <Table id="myTable">
          <SoftBox component="thead">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <DataTableHeadCell
                    width="auto"
                    key={header.id}
                    sorted={header.column.getIsSorted()}
                    isSorted={header.column.getIsSorted()}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </DataTableHeadCell>
                ))}
              </TableRow>
            ))}
          </SoftBox>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <SoftTypography sx={{ fontSize: 13, textAlign: "center" }}>
                    No Data Available
                  </SoftTypography>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <DataTableBodyCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </DataTableBodyCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </SoftBox>
  );
}
