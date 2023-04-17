import SoftTypography from "components/UI/SoftTypography";

export const columns = [
  {
    accessorKey: "created_at",
    cell: (info) => (
      <SoftTypography fontSize={12}>
        {new Date(info.getValue()?.seconds * 1000).toDateString()}
      </SoftTypography>
    ),
    header: "Date",
  },
  {
    accessorKey: "clock_in",
    cell: (info) => {
      return (
        <SoftTypography fontSize={12}>
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
        <SoftTypography fontSize={12}>
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
      return <SoftTypography fontSize={12}>{info.getValue()}</SoftTypography>;
    },
    header: "Work Mode",
  },
];
