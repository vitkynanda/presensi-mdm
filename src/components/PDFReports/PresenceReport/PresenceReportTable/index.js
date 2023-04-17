import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    marginBottom: 80,
  },
});

const PresenceReportTable = ({ items, withDate }) => (
  <View style={styles.tableContainer}>
    <TableHeader withDate={withDate} />
    <TableRow items={items} withDate={withDate} />
  </View>
);

export default PresenceReportTable;
