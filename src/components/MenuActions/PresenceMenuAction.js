import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Stack } from "@mui/material";
import DialogConfirm from "components/Dialogs/DialogConfirm";
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import { useState } from "react";
import { deletePresence, getAllPresenceData } from "services";
import { useUiStateStore } from "store/ui-state";
import PresenceUpdateModal from "../Modals/PresenceUpdateModal";

const PresenceMenuAction = ({ rowData }) => {
  const { globalLoading, setGlobalLoading, setAllPresenceData } =
    useUiStateStore();
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dialogConfirm, setDialogConfrim] = useState({ open: false });
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  return (
    <SoftBox>
      <PresenceUpdateModal
        title="Update Presence Data"
        open={openModal}
        handleClose={() => setOpenModal(false)}
        rowData={rowData}
      />
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
            setOpenModal(true);
            setOpenMenu(false);
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Edit />
            <SoftTypography sx={{ fontSize: 14 }}>
              Update Presence
            </SoftTypography>
          </Stack>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDialogConfrim({
              open: true,
              title: "delete",
              type: "presence",
              value: `(${rowData.user.name})`,
              loading: globalLoading,
              handleClose: () =>
                setDialogConfrim({ ...dialogConfirm, open: false }),
              action: async () => {
                setGlobalLoading(true);
                const res = await deletePresence(rowData);
                if (res) {
                  setDialogConfrim({ ...dialogConfirm, open: false });
                  const resUpdated = await getAllPresenceData();
                  if (resUpdated) setAllPresenceData(resUpdated);
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
              Delete Presence
            </SoftTypography>
          </Stack>
        </MenuItem>
      </Menu>
    </SoftBox>
  );
};

export default PresenceMenuAction;
