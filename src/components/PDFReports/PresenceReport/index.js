import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { formatDate } from "utils";
import PresenceReportTable from "./PresenceReportTable";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  titleContainer: {
    textAlign: "center",
  },
  titleText: {
    fontWeight: 800,
  },
  dateContainer: {
    marginTop: 30,
  },
  sign: {
    marginTop: 80,
    textAlign: "right",
  },
});

export const PresenceDocument = ({ date, team, year, allPresenceData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            DAFTAR HADIR TEAM MEMBER {team || "SV-MDM"}
          </Text>
          <Text style={styles.titleText}>TAHUN {year || "2023"}</Text>
        </View>
        <View style={styles.dateContainer}>
          {typeof date === "string" ? (
            <Text>Hari, Tanggal : {date}</Text>
          ) : (
            <Text>
              Periode: {formatDate(date.startDate, "local")} -{" "}
              {formatDate(date.endDate, "local")}
            </Text>
          )}
        </View>
        <PresenceReportTable
          items={allPresenceData}
          withDate={typeof date !== "string"}
        />
      </Page>
    </Document>
  );
};

const PresenceReport = (props) => {
  return (
    <PDFViewer width="100%" height="600">
      <PresenceDocument {...props} />
    </PDFViewer>
  );
};

export default PresenceReport;
