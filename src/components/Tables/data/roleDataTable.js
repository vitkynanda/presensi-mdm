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
    header: "Role Alias",
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
