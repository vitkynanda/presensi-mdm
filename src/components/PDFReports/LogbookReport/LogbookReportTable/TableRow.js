import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React, { Fragment } from "react";

const styles = StyleSheet.create({
  tableRow: {
    width: "100%",
    flexDirection: "row",
  },
  tableCol: {
    width: "10%",
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

const TableRow = ({ items = Array(50).fill(0) }) => {
  const rows = items.map((item, index) => (
    <View style={styles.tableRow} key={index}>
      <View style={[styles.tableCol, { width: "20%" }]}>
        <Text style={styles.tableCell}>
          {new Date(item.selected_date.seconds * 1000).toDateString()}
        </Text>
      </View>
      <View style={[styles.tableCol, { width: "20%" }]}>
        <Text style={styles.tableCell}>{item.usecase}</Text>
      </View>
      <View style={[styles.tableCol, { width: "45%" }]}>
        {item.activity.map((act, idx) => (
          <Text key={idx} style={styles.tableCell}>
            - {act}
          </Text>
        ))}
      </View>
      <View style={[styles.tableCol, { width: "15%" }]}>
        <Text style={styles.tableCell}>{item.work_mode}</Text>
      </View>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default TableRow;
