import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

// const borderColor = "lightgrey";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    border: "none",
    alignItems: "center",
    height: 24,
    borderBottomWidth: 1,
    fontStyle: "bold",
    flexGrow: 1,
  },
  no: {
    width: "10%",
    fontSize: 10,
    paddingLeft: 10,
  },
  date: {
    width: "20%",
    fontSize: 10,
  },
  name: {
    width: "30%",
    fontSize: 10,
  },
  work_mode: {
    width: "20%",
    fontSize: 10,
  },
  datang: {
    width: "20%",
    fontSize: 10,
  },
  pulang: {
    width: "20%",
    fontSize: 10,
  },
});

const TableHeader = ({ withDate }) => (
  <View style={styles.container}>
    <Text style={styles.no}>No</Text>
    {withDate && <Text style={styles.date}>Tanggal</Text>}
    <Text style={styles.name}>Nama</Text>
    <Text style={styles.work_mode}>Work Mode</Text>
    <Text
      style={{
        ...styles.datang,
        width: withDate ? "15%" : styles.datang.width,
      }}
    >
      Datang
    </Text>
    <Text
      style={{
        ...styles.pulang,
        width: withDate ? "15%" : styles.pulang.width,
      }}
    >
      Pulang
    </Text>
  </View>
);

export default TableHeader;
