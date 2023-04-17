import { Backdrop, CircularProgress, Stack } from "@mui/material";
import SoftTypography from "components/UI/SoftTypography";
// import { useEffect } from "react";
// import { getUserInfo } from "services";
// import { useUiStateStore } from "store/ui-state";

const FallbackUI = () => {
  // const { userLoggedIn, setUserLoggedIn, setGlobalLoading } = useUiStateStore();
  // useEffect(() => {
  //   (async () => {
  //     setGlobalLoading(true);
  //     const result = await getUserInfo(userLoggedIn.userInfo.id);
  //     if (result) setUserLoggedIn({ ...userLoggedIn, userInfo: result });
  //     setGlobalLoading(false);
  //   })();
  //   // eslint-disable-next-line
  // }, []);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress color="inherit" />
        <SoftTypography color="inherit" fontSize={14}>
          Load UI for the first time...
        </SoftTypography>
      </Stack>
    </Backdrop>
  );
};

export default FallbackUI;
