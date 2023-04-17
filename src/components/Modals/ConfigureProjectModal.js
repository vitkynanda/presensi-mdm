import SoftBox from "components/UI/SoftBox";
import SoftButton from "components/UI/SoftButton";
import {
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useUiStateStore } from "store/ui-state";
import SoftModal from "components/UI/SoftModal";
import SoftBottomModal from "components/UI/SoftBottomModal";
import { Delete, Edit, Settings } from "@mui/icons-material";
import InputWithLabel from "components/Inputs/InputWithLabel";
import TabPanel from "components/UI/TabPanel";
import SoftTypography from "components/UI/SoftTypography";
import {
  addProject,
  deleteProject,
  getUserInfo,
  updateProject,
  updateUser,
} from "services";
import { getUUID } from "utils";
import { toast } from "react-toastify";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ConfigureProjectModal() {
  const { userLoggedIn, setUserLoggedIn } = useUiStateStore();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("");
  const [tab, setTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState({});
  const handleChange = (event, newValue) => {
    setTab(newValue);
    setProject("");
    newValue === 1 && setSelectedProject({});
  };
  const matchesmd = useMediaQuery("(max-width:600px)");
  const ModalWrapper = matchesmd ? SoftBottomModal : SoftModal;

  const handleAddProject = async () => {
    setLoading(true);
    const projectId = getUUID();
    const res = await addProject({
      name: project,
      id: projectId,
    });
    if (res) {
      const updateUserInfo = await updateUser({
        ...userLoggedIn.userInfo,
        projects: userLoggedIn.userInfo.projects
          ? [
              ...userLoggedIn.userInfo.projects,
              { name: project, id: projectId },
            ]
          : [{ name: project, id: projectId }],
      });
      if (updateUserInfo) {
        const result = await getUserInfo(userLoggedIn.userInfo.id);
        if (result) {
          setUserLoggedIn({ ...userLoggedIn, userInfo: result });
          toast.success("Project added successfully");
          setTab(1);
          setProject("");
        }
      }
    }
    setLoading(false);
  };

  const handleUpdateProject = async () => {
    setLoading(true);
    const res = await updateProject({
      id: selectedProject.id,
      name: project,
    });

    if (res) {
      const values = [...userLoggedIn.userInfo.projects];
      values[selectedProject.index] = { name: project, id: selectedProject.id };
      const updateUserInfo = await updateUser({
        ...userLoggedIn.userInfo,
        projects: values,
      });
      if (updateUserInfo) {
        const result = await getUserInfo(userLoggedIn.userInfo.id);
        if (result) {
          setUserLoggedIn({ ...userLoggedIn, userInfo: result });
          toast.success("Project updated successfully");
          setProject("");
          setSelectedProject({});
        }
      }
    }
    setLoading(false);
  };

  const handleDeleteProject = async (deletedProject) => {
    setLoading(true);
    const res = await deleteProject({
      id: deletedProject.id,
    });

    if (res) {
      const values = [...userLoggedIn.userInfo.projects];
      values.splice(deletedProject.index, 1);
      const updateUserInfo = await updateUser({
        ...userLoggedIn.userInfo,
        projects: values,
      });
      if (updateUserInfo) {
        const result = await getUserInfo(userLoggedIn.userInfo.id);
        if (result) {
          setUserLoggedIn({ ...userLoggedIn, userInfo: result });
          toast.success("Project deleted successfully");
          setSelectedProject({});
        }
      }
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    tab === 0 ? handleAddProject() : handleUpdateProject();
  };

  return (
    <>
      {matchesmd ? (
        <IconButton onClick={() => setOpen(true)}>
          <Settings />
        </IconButton>
      ) : (
        <SoftButton
          variant="outlined"
          color="error"
          size="small"
          endIcon={<Settings color="error" size="large" />}
          onClick={() => setOpen(true)}
        >
          Configure Project
        </SoftButton>
      )}
      <ModalWrapper
        title="Configure Project"
        open={open}
        handleClose={() => setOpen(false)}
      >
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Add Project" {...a11yProps(0)} />
          <Tab label="Edit Project" {...a11yProps(1)} />
        </Tabs>
        {tab === 1 && <Divider />}

        <TabPanel value={tab} index={0}>
          <Stack spacing={2}>
            <InputWithLabel
              value={["", project]}
              onChange={(e) => setProject(e.target.value)}
              placeholder="Project Name"
            />
            <SoftBox textAlign="right">
              <SoftButton
                variant="gradient"
                color="error"
                disabled={!project || loading}
                endIcon={
                  loading ? (
                    <CircularProgress color="inherit" size={18} />
                  ) : null
                }
                onClick={handleSubmit}
              >
                Submit
              </SoftButton>
            </SoftBox>
          </Stack>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <SoftTypography variant="h6" fontWeight="bold" mt={-1}>
                Project List
              </SoftTypography>
              {userLoggedIn?.userInfo?.projects &&
              userLoggedIn?.userInfo?.projects?.length !== 0 ? (
                userLoggedIn?.userInfo?.projects?.map((project, idx) => (
                  <Stack
                    key={project?.id}
                    direction="row"
                    justifyContent="space-between"
                  >
                    <SoftTypography fontSize={15}>
                      {idx + 1}. {project?.name}
                    </SoftTypography>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setProject(project?.name);
                          setSelectedProject({ ...project, index: idx });
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleDeleteProject({ ...project, index: idx })
                        }
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </Stack>
                ))
              ) : (
                <SoftTypography fontSize={14} mt={1}>
                  No project found. please add project first.
                </SoftTypography>
              )}
            </Stack>
            <InputWithLabel
              value={["", project]}
              onChange={(e) => setProject(e.target.value)}
              placeholder="Edit Project Name"
            />
            <SoftBox textAlign="right">
              <SoftButton
                variant="gradient"
                disabled={!selectedProject.id || !project || loading}
                color="error"
                endIcon={
                  loading ? (
                    <CircularProgress color="inherit" size={18} />
                  ) : null
                }
                onClick={handleSubmit}
              >
                Submit
              </SoftButton>
            </SoftBox>
          </Stack>
        </TabPanel>
      </ModalWrapper>
    </>
  );
}
