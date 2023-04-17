import ProfileLogbookMenuAction from "components/MenuActions/ProfileLogbookMenuAction";
import SoftTypography from "components/UI/SoftTypography";

export const columns = [
  {
    accessorKey: "selected_date",
    cell: (info) => (
      <SoftTypography fontSize={13}>
        {new Date(info.getValue()?.seconds * 1000).toDateString()}
      </SoftTypography>
    ),
    header: "Date",
  },
  {
    accessorKey: "project",
    cell: (info) => (
      <SoftTypography fontSize={13}>{info.getValue()}</SoftTypography>
    ),
    header: "Project",
  },
  {
    accessorKey: "usecase",
    cell: (info) => (
      <SoftTypography fontSize={13}>{info.getValue()}</SoftTypography>
    ),
    header: "Usecase",
  },
  {
    accessorKey: "activity",
    cell: (info) => {
      return info.renderValue().map((activity, index) => (
        <SoftTypography key={index} fontSize={13}>
          - {activity}
        </SoftTypography>
      ));
    },
    header: "Activity",
  },
  {
    accessorKey: "next_activity",
    cell: (info) => {
      return info.renderValue().map((activity, index) => (
        <SoftTypography key={index} fontSize={13}>
          - {activity}
        </SoftTypography>
      ));
    },
    header: "Next Activity",
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
      return <ProfileLogbookMenuAction rowData={info.row.original} />;
    },
    header: "Action",
  },
];
