import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "utils";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgray",
    height: 30,
    fontStyle: "bold",
  },
  no: {
    width: "10%",
    textAlign: "left",
    fontSize: 10,
    paddingLeft: 10,
  },
  date: {
    width: "20%",
    textAlign: "left",
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
  datangTime: {
    width: "20%",
    fontSize: 10,
  },
  pulangTime: {
    width: "20%",
    fontSize: 10,
  },
});

const TableRow = ({ items = Array(50).fill(0), withDate }) => {
  const rows = items.map((item, index) => (
    <View
      key={index}
      style={{
        ...styles.row,
        backgroundColor: index % 2 === 0 ? styles.row.backgroundColor : "",
      }}
    >
      <Text style={styles.no}>{index + 1}</Text>
      {withDate && (
        <Text style={styles.date}>
          {formatDate(new Date(item.clock_in.seconds * 1000), "local")}
        </Text>
      )}
      <Text style={styles.name}>{item.user.name}</Text>
      <Text style={styles.work_mode}>{item.work_mode}</Text>
      <Text
        style={{
          ...styles.datangTime,
          width: withDate ? "15%" : styles.datangTime.width,
        }}
      >
        {new Date(item.clock_in.seconds * 1000).toLocaleTimeString()}
      </Text>
      <Text
        style={{
          ...styles.pulangTime,
          width: withDate ? "15%" : styles.pulangTime.width,
        }}
      >
        {item.clock_out
          ? new Date(item.clock_out.seconds * 1000).toLocaleTimeString()
          : "-"}
      </Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default TableRow;
