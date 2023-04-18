import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import SoftButton from "components/UI/SoftButton";
import SoftTypography from "components/UI/SoftTypography";
import { Stack } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogConfirm({
  open,
  handleClose,
  action,
  title,
  type,
  value,
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <Stack
        sx={(theme) => ({
          p: 2,
          px: 3,
          width: 500,
          [theme.breakpoints.down("md")]: {
            width: 300,
          },
        })}
        spacing={2}
      >
        <SoftTypography
          variant="h5"
          fontWeight="bold"
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              fontSize: 20,
            },
          })}
        >
          Are you sure want to {title} this {type} ?
        </SoftTypography>
        <SoftTypography
          fontSize={17}
          id="alert-dialog-slide-description"
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              fontSize: 14,
            },
          })}
        >
          You are trying to {title} this {type} {value}, please make sure you do
          the correct action.
        </SoftTypography>

        <DialogActions>
          <SoftButton
            color="info"
            variant="text"
            size="small"
            onClick={handleClose}
            mr={-1}
          >
            Cancel
          </SoftButton>
          <SoftButton
            color="info"
            size="small"
            variant="gradient"
            onClick={() => action()}
            mr={-1}
          >
            Yes
          </SoftButton>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
