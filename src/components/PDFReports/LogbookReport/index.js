import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import LogbookReportTable from "./LogbookReportTable";
// import { formatDate } from "utils";
// import LogbookReportTableV2 from "./LogbookReportTableV2";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 30,
    flexDirection: "column",
    width: "100%",
  },
  titleContainer: {
    textAlign: "center",
  },
  titleText: {
    fontWeight: 800,
  },
  dataContainer: {
    margin: "20px 0 15px 0",
  },
  dataInfo: {
    marginTop: 1,
    fontSize: "10px",
  },
  signContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  signTable: {
    display: "table",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    width: "35%",
    marginTop: 30,
  },

  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 3,
    fontSize: 10,
  },
});

export const LogbookDocument = ({ date, team, year, allLogbookData }) => {
  const projects = new Set(allLogbookData.map((data) => data.project));
  const projectStrings = Array.from(projects).join(", ");

  return (
    <Document orientation="landscape">
      <Page size="A4" style={styles.page}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            ABSENSI DAN DAILY REPORT PERSONAL
          </Text>
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.dataInfo}>
            Person: {allLogbookData[0].user.name}
          </Text>
          <Text style={styles.dataInfo}>
            Team: {allLogbookData[0].user.team}
          </Text>
          <Text style={styles.dataInfo}>Projects: {projectStrings} </Text>
          {/* {typeof date === "string" ? (
            <Text style={styles.dataInfo}>Hari, Tanggal : {date}</Text>
          ) : (
            <Text style={styles.dataInfo}>
              Periode: {formatDate(date.startDate, "local")} -{" "}
              {formatDate(date.endDate, "local")}
            </Text>
          )} */}
        </View>
        <LogbookReportTable items={allLogbookData} />
        <View style={styles.signContainer}>
          <View style={styles.signTable}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCol, { width: "50%" }]}>
                <Text style={styles.tableCell}>Team Member</Text>
              </View>
              <View style={[styles.tableCol, { width: "50%" }]}>
                <Text style={styles.tableCell}>Team Leader</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View
                style={[styles.tableCol, { width: "50%", height: 50 }]}
              ></View>
              <View
                style={[styles.tableCol, { width: "50%", height: 50 }]}
              ></View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const LogbookReport = (props) => {
  return (
    <PDFViewer width="100%" height="600">
      <LogbookDocument {...props} />
    </PDFViewer>
  );
};

export default LogbookReport;
