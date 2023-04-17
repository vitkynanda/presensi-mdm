import { MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import SoftTypography from "components/UI/SoftTypography";

export const columns = [
  {
    accessorKey: "name",
    cell: (info) => (
      <SoftTypography fontSize={13}>{info.getValue()}</SoftTypography>
    ),
    header: "Name",
  },
  {
    accessorKey: "alias",
    cell: (info) => (
      <SoftTypography fontSize={13}>{info.getValue()}</SoftTypography>
    ),
    header: "Alias Name",
  },
  {
    accessorKey: "created_at",
    cell: (info) => (
      <SoftTypography fontSize={13}>
        {new Date(info.getValue()?.seconds * 1000).toDateString()}
      </SoftTypography>
    ),
    header: "Created At",
  },
  {
    accessorKey: "updated_at",
    cell: (info) => {
      return (
        <SoftTypography fontSize={13}>
          {new Date(info.getValue()?.seconds * 1000).toDateString()}
        </SoftTypography>
      );
    },
    header: "Updated At",
  },
  {
    cell: (info) => {
      return (
        <IconButton fontSize={13}>
          <MoreVert />
        </IconButton>
      );
    },
    header: "Action",
  },
];
