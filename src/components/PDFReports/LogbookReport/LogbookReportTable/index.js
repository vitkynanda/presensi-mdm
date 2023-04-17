import { StyleSheet, View } from "@react-pdf/renderer";

import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

export const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});

const LogbookReportTable = ({ items }) => {
  return (
    <View style={styles.table}>
      <TableHeader />
      <TableRow items={items} />
    </View>
  );
};

export default LogbookReportTable;
