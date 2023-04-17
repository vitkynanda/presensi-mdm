import React from "react";
import {
  Table,
  TableCell,
  TableHeader,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import { Text } from "@react-pdf/renderer";

const LogbookReportTableV2 = ({ items }) => {
  return (
    <Table data={items}>
      <TableHeader>
        <TableCell style={{ width: "15%" }}>Date</TableCell>
        <TableCell>Usecase</TableCell>
        <TableCell>Activity</TableCell>
        <TableCell>Next Activity</TableCell>
        <TableCell>Work Mode</TableCell>
      </TableHeader>
      <TableBody>
        <DataTableCell
          getContent={(r) =>
            new Date(r.selected_date.seconds * 1000).toDateString()
          }
        />
        <DataTableCell getContent={(r) => r.usecase} />
        <DataTableCell
          getContent={(r) => r.activity.map((a) => <Text key={a}>- {a}</Text>)}
        />
        <DataTableCell
          getContent={(r) =>
            r.next_activity.map((a) => <Text key={a}>- {a}</Text>)
          }
        />
        <DataTableCell getContent={(r) => r.work_mode} />
      </TableBody>
    </Table>
  );
};

export default LogbookReportTableV2;
