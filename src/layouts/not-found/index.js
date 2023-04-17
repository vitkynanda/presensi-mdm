import { Stack } from "@mui/material";
import SoftBox from "components/UI/SoftBox";
import SoftButton from "components/UI/SoftButton";
import SoftTypography from "components/UI/SoftTypography";
import { setLayout } from "context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = ({ dispatch }) => {
  useEffect(() => {
    setLayout(dispatch, "error");
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <SoftBox
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack
        sx={{
          width: "90vw",
          mx: "auto",
          textAlign: "center",
          alignItems: "center",
        }}
        spacing={2}
      >
        <SoftTypography variant="h1" fontSize={90} fontWeight="bold">
          404
        </SoftTypography>
        <SoftTypography>Your destination page was not found !</SoftTypography>
        <SoftButton
          onClick={() => navigate(-1)}
          variant="gradient"
          color="error"
        >
          Go Back
        </SoftButton>
      </Stack>
    </SoftBox>
  );
};

export default NotFoundPage;
