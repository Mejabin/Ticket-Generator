import { useEffect, useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const Support = () => {
  const [supports, setSupports] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  //get method
  useEffect(() => {
    fetch("https://ticket-generator-server.vercel.app/all-supports")
      .then((res) => res.json())
      .then((data) => {
        setSupports(
          data.map((support, index) => ({ ...support, serial: index + 1 }))
        );
      });
  }, []);

  const filterSupportsByDate = () => {
    if (!selectedDate) return supports;
    return supports.filter(
      (support) =>
        new Date(support.date).toLocaleDateString() ===
        selectedDate.toLocaleDateString()
    );
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const PDFDocument = () => (
    <Document>
      <Page size="A4">
        <View style={styles.page}>
          <Text style={styles.title}>Support Panel</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCellHeader}>
                <Text>Serial</Text>
              </View>
              <View style={styles.tableCellHeader}>
                <Text>Date</Text>
              </View>
              <View style={styles.tableCellHeader}>
                <Text>Category</Text>
              </View>
              <View style={styles.tableCellHeader}>
                <Text>Number</Text>
              </View>
              <View style={styles.tableCellHeader}>
                <Text>Token</Text>
              </View>
            </View>
            {filterSupportsByDate().map((support, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>{support.serial}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{new Date(support.date).toLocaleString()}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{support.category}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{support.mobileNo}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{support.token}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 50,
    },
    title: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 0.4,
      borderColor: "#000",
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 0.4,
      borderColor: "#000",
    },
    tableCellHeader: {
      flex: 1,
      padding: 4,
      borderStyle: "solid",
      borderWidth: 0.4,
      borderColor: "#000",
      backgroundColor: "#f0f0f0",
      fontSize: 8,
    },
    tableCell: {
      flex: 1,
      padding: 4,
      borderStyle: "solid",
      borderWidth: 0.4,
      borderColor: "#000",
      fontSize: 8,
    },
  });

  return (
    <div className="mx-auto p-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Support Panel</h2>
      <div className="overflow-x-auto">
        <table className="table-auto max-w-screen-md mx-auto border border-gray-950">
          <thead className="border">
            <tr>
              <th className="border px-4 py-2">Serial</th>
              <th className="border px-4 py-2">
                <input
                  type="date"
                  value={
                    selectedDate ? selectedDate.toISOString().split("T")[0] : ""
                  }
                  onChange={handleDateChange}
                  className="border px-2 py-1 w-full"
                />
              </th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Number</th>
              <th className="border px-4 py-2">Token</th>
            </tr>
          </thead>
          <tbody>
            {filterSupportsByDate().map((support, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{support.serial}</td>
                <td className="border px-4 py-2">
                  {new Date(support.date).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{support.category}</td>
                <td className="border px-4 py-2">{support.mobileNo}</td>
                <td className="border px-4 py-2">{support.token}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 flex justify-center">
          <PDFDownloadLink
            document={<PDFDocument />}
            fileName="support_data.pdf"
          >
            {({ blob, url, loading, error }) => (
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-black"
                type="button"
              >
                Download
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default Support;
