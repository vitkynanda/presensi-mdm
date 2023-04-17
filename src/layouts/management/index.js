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

// Soft UI Dashboard React examples
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Header from "../../components/Headers/ManagementHeader";
import { useUiStateStore } from "store/ui-state";
import TabPanel from "components/UI/TabPanel";
import SoftTypography from "components/UI/SoftTypography";
import { Divider } from "@mui/material";
import TeamTable from "../../components/Tables/TeamTable";
import UserTable from "../../components/Tables/UserTable";
import WorkplaceTable from "../../components/Tables/WorkplaceTable";
import RoleTable from "../../components/Tables/RoleTable";
import PresencesManagement from "./pages/PresencesManagement";
import LogbooksManagement from "./pages/LogbooksManagement";

function Managements() {
  const { currentAdminTab } = useUiStateStore();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header />
      <TabPanel value={currentAdminTab} index={0}>
        <PresencesManagement />
      </TabPanel>
      <TabPanel value={currentAdminTab} index={1}>
        <LogbooksManagement />
      </TabPanel>
      <TabPanel value={currentAdminTab} index={2}>
        <SoftTypography variant="h5" fontWeight="bold" mt={2}>
          Teams Management
        </SoftTypography>
        <Divider />
        <TeamTable />
      </TabPanel>
      <TabPanel value={currentAdminTab} index={3}>
        <SoftTypography variant="h5" fontWeight="bold" mt={2}>
          Users Management
        </SoftTypography>
        <Divider />
        <UserTable />
      </TabPanel>
      <TabPanel value={currentAdminTab} index={4}>
        <SoftTypography variant="h5" fontWeight="bold" mt={2}>
          Workplaces Management
        </SoftTypography>
        <Divider />
        <WorkplaceTable />
      </TabPanel>
      <TabPanel value={currentAdminTab} index={5}>
        <SoftTypography variant="h5" fontWeight="bold" mt={2}>
          Roles Management
        </SoftTypography>
        <Divider />
        <RoleTable />
      </TabPanel>
    </DashboardLayout>
  );
}

export default Managements;
