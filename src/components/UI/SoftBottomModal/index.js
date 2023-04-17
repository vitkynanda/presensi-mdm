import Modal from "@mui/material/Modal";
import { Backdrop, Divider, Fade, IconButton } from "@mui/material";
import SoftBox from "../SoftBox";
import SoftTypography from "../SoftTypography";
import { Close } from "@mui/icons-material";

const styles = () => {
  return {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    maxHeight: "85vh",
    minHeight: "60vh",
    boxShadow: 24,
    borderRadius: "20px 20px 0 0",
    outline: "none",
    transition: "all 0.5s ease-in-out",
  };
};

export default function SoftBottomModal({
  children,
  title,
  open = false,
  handleClose,
  height,
}) {
  return (
    children && (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <SoftBox p={3} sx={{ ...styles(), minHeight: height }}>
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", right: 10, top: 4 }}
            >
              <Close />
            </IconButton>
            <SoftTypography id="modal-modal-title" variant="h5" component="h2">
              {title}
            </SoftTypography>
            <Divider />
            <SoftBox
              sx={{
                maxHeight: "70vh",
                overflowY: "auto",
                overflowX: "hidden",
                p: 1,
              }}
            >
              {children}
            </SoftBox>
          </SoftBox>
        </Fade>
      </Modal>
    )
  );
}
