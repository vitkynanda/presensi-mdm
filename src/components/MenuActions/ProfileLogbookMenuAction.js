import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Stack } from "@mui/material";
import DialogConfirm from "components/Dialogs/DialogConfirm";
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import { useState } from "react";
import { deleteLogbook, getLogbookInfo } from "services";
import { useUiStateStore } from "store/ui-state";

const ProfileLogbookMenuAction = ({ rowData }) => {
  const {
    globalLoading,
    setGlobalLoading,
    userLoggedIn,
    setLogbookInfo,
    setSelectedLogbook,
  } = useUiStateStore();
  const [openMenu, setOpenMenu] = useState(false);
  const [dialogConfirm, setDialogConfrim] = useState({ open: false });
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  return (
    <SoftBox>
      <DialogConfirm {...dialogConfirm} />
      <IconButton fontSize={13} onClick={handleOpenMenu}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={openMenu}
        anchorReference={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            document.documentElement.scrollTop = 480;
            document.scrollingElement.scrollTop = 480;
            setSelectedLogbook(rowData);
            setOpenMenu(false);
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Edit />
            <SoftTypography sx={{ fontSize: 14 }}>Edit Logbook</SoftTypography>
          </Stack>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDialogConfrim({
              open: true,
              title: "delete",
              type: "logbook",
              value: `(${rowData.id})`,
              loading: globalLoading,
              handleClose: () =>
                setDialogConfrim({ ...dialogConfirm, open: false }),
              action: async () => {
                setGlobalLoading(true);
                const res = await deleteLogbook(rowData);
                if (res) {
                  setDialogConfrim({ ...dialogConfirm, open: false });
                  const resUpdated = await getLogbookInfo(
                    userLoggedIn?.userInfo.id
                  );
                  if (resUpdated) setLogbookInfo(resUpdated);
                }
                setGlobalLoading(false);
              },
            });
            setOpenMenu(false);
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Delete />
            <SoftTypography sx={{ fontSize: 14 }}>
              Delete Logbook
            </SoftTypography>
          </Stack>
        </MenuItem>
      </Menu>
    </SoftBox>
  );
};

export default ProfileLogbookMenuAction;
