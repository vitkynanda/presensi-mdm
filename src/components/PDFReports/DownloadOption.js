import { Analytics, MoreVert, PictureAsPdf } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Stack } from "@mui/material";
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import { useState } from "react";
import { exportExcel } from "utils";

const DownloadOption = ({ PdfLink, rawData, formatter }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  return (
    <SoftBox>
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
            setOpenMenu(false);
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <PictureAsPdf />
            <PdfLink />
          </Stack>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenMenu(false);
            exportExcel(formatter(rawData));
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Analytics />
            <SoftTypography sx={{ fontSize: 14 }}>
              Download Excel
            </SoftTypography>
          </Stack>
        </MenuItem>
      </Menu>
    </SoftBox>
  );
};

export default DownloadOption;
