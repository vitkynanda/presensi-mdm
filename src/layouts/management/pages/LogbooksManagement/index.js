import { Card, Divider, Stack } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LogbookReport, {
  LogbookDocument,
} from "components/PDFReports/LogbookReport";
import DownloadOption from "components/PDFReports/DownloadOption";

import LogbookTable from "components/Tables/LogbookTable.js";
import SoftButton from "components/UI/SoftButton";
import SoftTypography from "components/UI/SoftTypography";
import { useState } from "react";
import { useUiStateStore } from "store/ui-state";
import { formatDate, weekday } from "utils";

const defaultDate = `${weekday[new Date().getDay()]}, ${formatDate(
  new Date(),
  "local"
)}`;

const formatDataForExcel = (rawData) =>
  rawData.map((data) => ({
    selected_date: new Date(data.selected_date.seconds * 1000).toDateString(),
    user: data.user.name,
    team: data.user.team,
    project: data.project,
    usecase: data.usecase,
    activity: data.activity.map((act) => `- ${act}`).join(" "),
    next_activity: data.next_activity.map((act) => `- ${act}`).join(" "),
    work_mode: data.work_mode,
  }));

const LogbooksManagement = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [disablePreview, setDisablePreview] = useState(true);
  const [date, setDate] = useState(defaultDate);
  const { allLogbookData } = useUiStateStore();

  const onSetDate = (filter) => {
    filter.startDate && filter.endDate
      ? setDisablePreview(false)
      : setDisablePreview(true);
    new Date(filter.startDate).toLocaleDateString() !==
    new Date(filter.endDate).toLocaleDateString()
      ? setDate(filter)
      : setDate(
          `${weekday[new Date(filter.startDate).getDay()]}, ${formatDate(
            filter.endDate,
            "local"
          )}`
        );
  };
  const SaveAsPdf = () => (
    <PDFDownloadLink
      document={
        <LogbookDocument date={date} allLogbookData={allLogbookData || []} />
      }
      fileName={`${
        typeof date === "string"
          ? date
          : formatDate(date.startDate, "local") +
            "-" +
            formatDate(date.endDate, "local")
      }-logbook.pdf`}
      style={{ color: "#344747" }}
    >
      {({ loading }) => (loading ? "Loading document..." : "Save as PDF")}
    </PDFDownloadLink>
  );
  return (
    <>
      <SoftTypography variant="h5" fontWeight="bold" mt={2}>
        Logbooks Management
      </SoftTypography>
      <Divider />
      <LogbookTable onSetDate={onSetDate} />
      <Card sx={{ mt: 2 }}>
        <Stack p={2} spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <SoftTypography variant="h6">
              Logbooks Report Preview
            </SoftTypography>
            <SoftButton
              disabled={disablePreview || allLogbookData.length === 0}
              onClick={() => setShowPreview(!showPreview)}
              variant="gradient"
              color="info"
              size="small"
            >
              {showPreview ? "Hide" : "Show"} Preview
            </SoftButton>
            {!disablePreview && allLogbookData.length > 0 && (
              <DownloadOption
                PdfLink={SaveAsPdf}
                rawData={allLogbookData}
                formatter={formatDataForExcel}
              />
            )}
          </Stack>
          {showPreview && (
            <LogbookReport
              date={new Date().toLocaleDateString()}
              allLogbookData={allLogbookData || []}
            />
          )}
        </Stack>
      </Card>
    </>
  );
};

export default LogbooksManagement;
