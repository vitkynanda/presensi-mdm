import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
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

const TableHeader = () => (
  <View style={styles.tableRow}>
    <View style={[styles.tableCol, { width: "20%" }]}>
      <Text style={styles.tableCell}>Date</Text>
    </View>
    <View style={[styles.tableCol, { width: "20%" }]}>
      <Text style={styles.tableCell}>Usecase</Text>
    </View>
    <View style={[styles.tableCol, { width: "45%" }]}>
      <Text style={styles.tableCell}>Activity</Text>
    </View>
    <View style={[styles.tableCol, { width: "15%" }]}>
      <Text style={styles.tableCell}>Work Mode</Text>
    </View>
  </View>
);

export default TableHeader;
