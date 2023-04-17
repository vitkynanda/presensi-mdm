import Modal from "@mui/material/Modal";
import SoftBox from "../SoftBox";
import { Close } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import SoftTypography from "../SoftTypography";

const style = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  maxWidth: 650,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  outline: "none",
  p: 3,
});

export default function SoftModal({
  children,
  title,
  open = false,
  handleClose,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <SoftBox sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 10, top: 4 }}
        >
          <Close />
        </IconButton>
        <SoftTypography id="modal-modal-title" variant="h5">
          {title}
        </SoftTypography>
        <Divider />
        <SoftBox
          sx={{
            maxHeight: "80vh",
            overflowY: "auto",
            overflowX: "hidden",
            p: 1,
          }}
        >
          {children}
        </SoftBox>
      </SoftBox>
    </Modal>
  );
}
