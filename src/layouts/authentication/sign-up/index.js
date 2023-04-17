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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import SoftInput from "components/UI/SoftInput";
import SoftButton from "components/UI/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import curved6 from "assets/images/curved-images/curved14.jpg";

import { auth } from "config/firebase";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addUser } from "services";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.get("email"),
        formData.get("password")
      );

      if (userCredential) {
        try {
          await updateProfile(auth.currentUser, {
            displayName: formData.get("name"),
          });
          const result = await addUser({
            id: userCredential.user.uid,
            name: formData.get("name"),
            email: formData.get("email"),
          });
          if (result) {
            toast.success("Account registered successfully");
            navigate("/authentication/sign-in");
          }
        } catch (e) {
          toast.error(e.message);
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
    setLoading(false);
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium" color="error">
            Register Account
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSignUp}>
            <SoftBox mb={2}>
              <SoftInput placeholder="Name" name="name" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email" name="email" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                name="password"
              />
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="error"
                fullWidth
                type="submit"
                endIcon={
                  loading ? (
                    <CircularProgress color="inherit" size={18} />
                  ) : null
                }
                disabled={loading}
              >
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="error"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
