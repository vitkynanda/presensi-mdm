import SoftTypography from "components/UI/SoftTypography";
import ActivateAccount from "../../MenuActions/ActivateAccount";
import UserMenuAction from "../../MenuActions/UserMenuAction";

export const columns = [
  {
    accessorKey: "name",
    cell: (info) => (
      <SoftTypography fontSize={13}>{info.getValue()}</SoftTypography>
    ),
    header: "Name",
  },
  {
    accessorKey: "email",
    cell: (info) => (
      <SoftTypography fontSize={13}>{info.getValue()}</SoftTypography>
    ),
    header: "Email",
  },
  {
    accessorKey: "company_role.name",
    cell: (info) => (
      <SoftTypography fontSize={13}>{info.getValue()}</SoftTypography>
    ),
    header: "Company Role",
  },
  {
    accessorKey: "team.name",
    cell: (info) => (
      <SoftTypography fontSize={13}>{info.getValue()}</SoftTypography>
    ),
    header: "Team",
  },
  {
    accessorKey: "workplace.name",
    cell: (info) => (
      <SoftTypography fontSize={13}>{info.getValue()}</SoftTypography>
    ),
    header: "Workplace",
  },
  {
    accessorKey: "is_active",
    cell: (info) => <ActivateAccount userData={info.row.original} />,
    header: "Activate Account",
  },
  {
    cell: (info) => {
      return <UserMenuAction rowData={info.row.original} />;
    },
    header: "Action",
  },
];
