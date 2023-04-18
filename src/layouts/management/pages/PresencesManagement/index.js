import { Card, Divider, Stack } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadOption from "components/PDFReports/DownloadOption";
import PresenceReport, {
  PresenceDocument,
} from "components/PDFReports/PresenceReport";
import PresenceTable from "components/Tables/PresenceTable";
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
    user: data.user.name,
    team: data.user.team,
    location: `${data.location.lat}, ${data.location.lng}`,
    clock_in: new Date(data.clock_in.seconds * 1000).toDateString(),
    clock_out: new Date(data.clock_out.seconds * 1000).toDateString(),
    work_mode: data.work_mode,
  }));

const PresencesManagement = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [disablePreview, setDisablePreview] = useState(true);
  const [date, setDate] = useState(defaultDate);
  const { allPresenceData } = useUiStateStore();

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
        <PresenceDocument date={date} allPresenceData={allPresenceData} />
      }
      fileName={`${
        typeof date === "string"
          ? date
          : formatDate(date.startDate, "local") +
            "-" +
            formatDate(date.endDate, "local")
      }-presence.pdf`}
      style={{ color: "#344747" }}
    >
      {({ loading }) => (loading ? "Loading document..." : "Save as PDF")}
    </PDFDownloadLink>
  );

  return (
    <>
      <SoftTypography variant="h5" fontWeight="bold" mt={2}>
        Presences Management
      </SoftTypography>
      <Divider />
      <PresenceTable onSetDate={onSetDate} />
      <Card sx={{ mt: 2 }}>
        <Stack p={2} spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <SoftTypography variant="h6">
              Presences Report Preview
            </SoftTypography>
            <SoftButton
              disabled={disablePreview}
              onClick={() => setShowPreview(!showPreview)}
              variant="gradient"
              color="info"
              size="small"
            >
              {showPreview ? "Hide" : "Show"} Preview
            </SoftButton>
            {!disablePreview && (
              <DownloadOption
                PdfLink={SaveAsPdf}
                rawData={allPresenceData}
                formatter={formatDataForExcel}
              />
            )}
          </Stack>
          {showPreview && (
            <PresenceReport date={date} allPresenceData={allPresenceData} />
          )}
        </Stack>
      </Card>
    </>
  );
};

export default PresencesManagement;
