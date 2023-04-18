/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import SoftInput from "components/UI/SoftInput";
import SoftButton from "components/UI/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "config/firebase";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useUiStateStore } from "store/ui-state";
import { getUserInfo } from "services";
import { CircularProgress } from "@mui/material";

function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const { userLoggedIn, setUserLoggedIn } = useUiStateStore();

  const handleSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get("email") || !formData.get("password")) {
      setLoading(false);
      return toast.error("Invalid Email or Password");
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.get("email"),
        formData.get("password")
      );
      if (userCredential) {
        const result = await getUserInfo(formData.get("email"));
        if (result) {
          setUserLoggedIn({ ...userLoggedIn, userInfo: result });
          navigate("/profile");
          toast.success("User logged in successfully");
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
    setLoading(false);
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
      color="info"
    >
      <SoftBox component="form" role="form" onSubmit={handleSignIn}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" name="email" />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" name="password" />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton
            variant="gradient"
            color="info"
            fullWidth
            type="submit"
            endIcon={
              loading ? <CircularProgress color="inherit" size={18} /> : null
            }
            disabled={loading}
          >
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
