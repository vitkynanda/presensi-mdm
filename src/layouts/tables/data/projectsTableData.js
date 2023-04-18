/* eslint-disable react/prop-types */

// Soft UI Dashboard React components
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import SoftProgress from "components/UI/SoftProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import SoftThemedIcon from "components/UI/SoftThemedIcon";
import { MoreVert } from "@mui/icons-material";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress
          value={value}
          color={color}
          variant="gradient"
          label={false}
        />
      </SoftBox>
    </SoftBox>
  );
}

const action = <SoftThemedIcon IconComponent={MoreVert} />;

const projectsTableData = {
  columns: [
    { name: "project", align: "left" },
    { name: "budget", align: "left" },
    { name: "status", align: "left" },
    { name: "completion", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      project: [logoSpotify, "Spotift"],
      budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $2,500
        </SoftTypography>
      ),
      status: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          working
        </SoftTypography>
      ),
      completion: <Completion value={60} color="info"" />,
      action,
    },
    {
      project: [logoInvesion, "Invesion"],
      budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $5,000
        </SoftTypography>
      ),
      status: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          done
        </SoftTypography>
      ),
      completion: <Completion value={100} color="success" />,
      action,
    },
    {
      project: [logoJira, "Jira"],
      budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $3,400
        </SoftTypography>
      ),
      status: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          canceled
        </SoftTypography>
      ),
      completion: <Completion value={30} color="info" />,
      action,
    },
    {
      project: [logoSlack, "Slack"],
      budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $1,400
        </SoftTypography>
      ),
      status: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          canceled
        </SoftTypography>
      ),
      completion: <Completion value={0} color="info" />,
      action,
    },
    {
      project: [logoWebDev, "Webdev"],
      budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $14,000
        </SoftTypography>
      ),
      status: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          working
        </SoftTypography>
      ),
      completion: <Completion value={80} color="info"" />,
      action,
    },
    {
      project: [logoXD, "Adobe XD"],
      budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $2,300
        </SoftTypography>
      ),
      status: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          done
        </SoftTypography>
      ),
      completion: <Completion value={100} color="success" />,
      action,
    },
  ],
};

export default projectsTableData;
