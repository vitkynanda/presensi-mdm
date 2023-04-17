import { Done } from "@mui/icons-material";
import { Card, Chip, Divider, Grid, Skeleton, Stack } from "@mui/material";
import PresenceModal from "components/Modals/PresenceModal";
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import { serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addPresence, getPresenceInfo, updatePresence } from "services";
import { useUiStateStore } from "store/ui-state";
import { arePointsNear, getLocation, validateClockOut } from "utils";
import ProfilePresenceTable from "components/Tables/ProfilePresenceTable";
import PresenceLMap from "components/Maps/PresenceLMap";

const Presences = ({ presenceToday }) => {
  const { userLoggedIn, setPresenceInfo, globalLoading } = useUiStateStore();
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [presenceType, setPrensenceType] = useState("Clock In");

  const handleLocation = (location) =>
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

  const handleClockIn = async (work_mode) => {
    setLoading(true);
    const res = await addPresence({
      work_mode,
      location,
      user: {
        id: userLoggedIn?.userInfo?.id,
        name: userLoggedIn?.userInfo?.name,
        team: userLoggedIn?.userInfo?.team.name,
      },
    });

    if (res) {
      setOpenModal(false);
      const resGet = await getPresenceInfo(userLoggedIn?.userInfo?.id);
      if (resGet) {
        setPresenceInfo(resGet);
        toast.success("Clocked in successfully");
      }
    }
    setLoading(false);
  };

  const handleClockOut = async () => {
    setLoading(true);
    const res = await updatePresence({
      ...presenceToday,
      clock_out: serverTimestamp(),
    });

    if (res) {
      setOpenModal(false);
      const resGet = await getPresenceInfo(userLoggedIn?.userInfo?.id);
      if (resGet) {
        setPresenceInfo(resGet);
        toast.success("Clocked out successfully");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getLocation(handleLocation);
  }, []);

  return (
    <SoftBox>
      <PresenceModal
        title={presenceType}
        open={openModal}
        loading={loading}
        handleClose={() => setOpenModal((prev) => !prev)}
        action={presenceType === "Clock In" ? handleClockIn : handleClockOut}
        location={location}
      />
      <Stack>
        <SoftTypography
          variant="h3"
          sx={(theme) => ({
            mb: 1,
            [theme.breakpoints.down("md")]: {
              fontSize: 22,
            },
          })}
        >
          Presences
        </SoftTypography>
        <SoftTypography
          sx={(theme) => ({
            mb: 1,
            [theme.breakpoints.down("md")]: {
              fontSize: 16,
            },
          })}
        >
          Today, {new Date().toDateString()}
        </SoftTypography>
        <Divider />
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {loading || globalLoading ? (
            <Skeleton variant="rounded" height={200} />
          ) : (
            <Card
              sx={{
                p: 2,
                height: "100%",
                "&:hover": { transform: "scale(1.01)" },
                transition: "all 250ms ease-in-out",
              }}
              onClick={() => {
                if (presenceToday?.clock_in)
                  return toast.error("You already clocked in !");
                if (!location.lat) return toast.error("Wait location loaded !");
                setPrensenceType("Clock In");
                setOpenModal(true);
              }}
            >
              <Stack lineHeight={1} spacing={2}>
                <SoftTypography fontWeight="bold">Clock In</SoftTypography>
                <Divider />
                {presenceToday && presenceToday?.clock_in ? (
                  <>
                    <SoftTypography fontSize={14}>
                      Status :{" "}
                      <Chip
                        component="span"
                        label={
                          presenceToday?.clock_in
                            ? "Already clocked in"
                            : "Not clock in yet"
                        }
                        onClick={() => {}}
                        deleteIcon={<Done />}
                        size="small"
                        variant="outlined"
                        color={presenceToday?.clock_in ? "success" : "inherit"}
                      />
                    </SoftTypography>
                    <SoftTypography fontSize={14}>
                      Time :{" "}
                      {new Date(
                        presenceToday?.clock_in?.seconds * 1000
                      ).toLocaleTimeString()}{" "}
                    </SoftTypography>
                    <SoftTypography fontSize={14}>
                      Work Mode : {presenceToday?.work_mode}
                    </SoftTypography>
                  </>
                ) : (
                  <SoftTypography fontSize={14}>
                    No clock in info, Tap this card to clock in.
                  </SoftTypography>
                )}
              </Stack>
            </Card>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {loading || globalLoading ? (
            <Skeleton variant="rounded" height={200} />
          ) : (
            <Card
              sx={{
                p: 2,
                height: "100%",
                "&:hover": { transform: "scale(1.01)" },
                transition: "all 250ms ease-in-out",
              }}
              onClick={() => {
                if (!presenceToday?.clock_in)
                  return toast.error("You haven't clocked in yet");
                if (presenceToday?.clock_out)
                  return toast.error("You already clocked out !");
                if (!validateClockOut(presenceToday?.clock_in))
                  return toast.error(
                    "Clock out not allowed under 8 work hours"
                  );

                if (
                  !arePointsNear(
                    userLoggedIn?.userInfo?.workplace?.location,
                    location,
                    userLoggedIn?.userInfo?.workplace?.radius
                  ) &&
                  presenceToday?.work_mode === "WFO"
                )
                  return toast.error(
                    "Clock out not allowed outside of the workplace"
                  );

                setPrensenceType("Clock Out");
                setOpenModal(true);
              }}
            >
              <Stack lineHeight={1} spacing={2}>
                <SoftTypography fontWeight="bold">Clock Out</SoftTypography>
                <Divider />
                {presenceToday && presenceToday?.clock_out ? (
                  <>
                    <SoftTypography fontSize={14}>
                      Status :{" "}
                      <Chip
                        component="span"
                        label={
                          presenceToday?.clock_out
                            ? "Already clocked out"
                            : "Not clocked out yet"
                        }
                        onClick={() => {}}
                        deleteIcon={<Done />}
                        size="small"
                        variant="outlined"
                        color={presenceToday?.clock_out ? "success" : "inherit"}
                      />
                    </SoftTypography>
                    <SoftTypography fontSize={14}>
                      Time :{" "}
                      {new Date(
                        presenceToday?.clock_out?.seconds * 1000
                      ).toLocaleTimeString()}{" "}
                    </SoftTypography>
                    <SoftTypography fontSize={14}>
                      Work Mode : {presenceToday?.work_mode}
                    </SoftTypography>
                  </>
                ) : (
                  <SoftTypography fontSize={14}>
                    No clock out info, Tap this card to clock out.
                  </SoftTypography>
                )}
              </Stack>
            </Card>
          )}
        </Grid>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 2, height: "100%" }}>
            <Stack lineHeight={1} spacing={1}>
              <SoftTypography variant="h6">Your Work Location</SoftTypography>
              <Divider />
              <PresenceLMap
                location={
                  (presenceToday && presenceToday?.location) || location
                }
                workplace={userLoggedIn?.userInfo?.workplace?.location}
                radius={userLoggedIn?.userInfo?.workplace?.radius}
              />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          {loading ? (
            <Skeleton variant="rounded" height={300} />
          ) : (
            <ProfilePresenceTable />
          )}
        </Grid>
      </Grid>
    </SoftBox>
  );
};

export default Presences;
