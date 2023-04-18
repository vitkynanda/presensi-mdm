import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { useUiStateStore } from "store/ui-state";
import { useNavigate } from "react-router-dom";
import SoftButton from "components/UI/SoftButton";
import SoftTypography from "components/UI/SoftTypography";
import { Stack } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogVerified({ open }) {
  const { resetAllState, userLoggedIn } = useUiStateStore();
  const navigate = useNavigate();
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
        <SoftTypography variant="h5" fontWeight="bold">
          Authentication Information
        </SoftTypography>
        <SoftTypography fontSize={17} id="alert-dialog-slide-description">
          Hello {userLoggedIn?.userInfo?.name}, your account isn't active,
          please contact the administartor to activate your account.
        </SoftTypography>

        <DialogActions>
          <SoftButton
            color="info"
            size="small"
            variant="gradient"
            onClick={() => {
              navigate("/authentication/sign-in");
              resetAllState();
            }}
            mr={-1}
          >
            Yes, I Understand
          </SoftButton>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
