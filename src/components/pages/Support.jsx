import { useEffect, useState } from "react";
import logo from "../../assets/BAITS-white.png";
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
    <div className="mx-auto p-12 max-w-6xl">
      <div className="overflow-x-auto">
        <div className=" bg-emerald-600 rounded-t-lg flex items-center justify-between  px-10">
          <h1 className="text-xl py-4 text-white">Support Panel</h1>
          <div className="">
            <img src={logo} className="h-6" alt="" />
          </div>
        </div>
        <table className="table-auto w-full mx-auto border border-emerald-800">
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
          <tbody className="rounded-b-lg">
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
        <div className="mt-8 flex justify-end">
          <PDFDownloadLink
            document={<PDFDocument />}
            fileName="support_data.pdf"
          >
            {({ blob, url, loading, error }) => (
              <button
                className="bg-black text-white px-6 py-3.5 rounded hover:bg-black flex items-center justify-center gap-3"
                type="button"
              >
                <span>Download</span>
                <span>
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V12.1893L14.4697 10.4697C14.7626 10.1768 15.2374 10.1768 15.5303 10.4697C15.8232 10.7626 15.8232 11.2374 15.5303 11.5303L12.5303 14.5303C12.3897 14.671 12.1989 14.75 12 14.75C11.8011 14.75 11.6103 14.671 11.4697 14.5303L8.46967 11.5303C8.17678 11.2374 8.17678 10.7626 8.46967 10.4697C8.76256 10.1768 9.23744 10.1768 9.53033 10.4697L11.25 12.1893V7C11.25 6.58579 11.5858 6.25 12 6.25Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        d="M7.25 17C7.25 16.5858 7.58579 16.25 8 16.25H16C16.4142 16.25 16.75 16.5858 16.75 17C16.75 17.4142 16.4142 17.75 16 17.75H8C7.58579 17.75 7.25 17.4142 7.25 17Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.9426 1.25C9.63423 1.24999 7.82519 1.24998 6.4137 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63423 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.4137 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25H11.9426ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62178 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62177 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62178 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z"
                        fill="#ffffff"
                      ></path>{" "}
                    </g>
                  </svg>
                </span>
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default Support;
