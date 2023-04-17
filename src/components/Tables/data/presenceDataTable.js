import SoftTypography from "components/UI/SoftTypography";
import PresenceMenuAction from "../../MenuActions/PresenceMenuAction";

export const columns = [
  {
    accessorKey: "user.name",
    cell: (info) => (
      <SoftTypography fontSize={13}>{info.getValue()}</SoftTypography>
    ),
    header: "Name",
  },
  {
    accessorKey: "created_at",
    cell: (info) => (
      <SoftTypography fontSize={13}>
        {new Date(info.getValue()?.seconds * 1000).toDateString()}
      </SoftTypography>
    ),
    header: "Date",
  },
  {
    accessorKey: "clock_in",
    cell: (info) => {
      return (
        <SoftTypography fontSize={13}>
          {new Date(info.getValue()?.seconds * 1000).toLocaleTimeString()}
        </SoftTypography>
      );
    },
    header: "Clock In",
  },
  {
    accessorKey: "clock_out",
    cell: (info) => {
      return (
        <SoftTypography fontSize={13}>
          {info.getValue()
            ? new Date(info.getValue().seconds * 1000).toLocaleTimeString()
            : "-"}
        </SoftTypography>
      );
    },
    header: "Clock Out",
  },
  {
    accessorKey: "work_mode",
    cell: (info) => {
      return <SoftTypography fontSize={13}>{info.getValue()}</SoftTypography>;
    },
    header: "Work Mode",
  },

  {
    cell: (info) => {
      return <PresenceMenuAction rowData={info.row.original} />;
    },
    header: "Action",
  },
];
