import { useEffect, useState } from "react";
import logo from "../../assets/BAITS-white.png";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const Support = () => {
  const [supports, setSupports] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filteredSupports, setFilteredSupports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const supportsPerPage = 15;
  

  // Get method
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

  // Filter supports by selected subcategory
  const filterSupportsBySubcategory = () => {
    if (!selectedSubcategory) return supports;
    return supports.filter(
      (support) => support.subcategory === selectedSubcategory
    );
  };

  // Handle subcategory click
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    // Filter supports based on selected subcategory
    setFilteredSupports(
      supports.filter((support) => support.subcategory === subcategory)
    );
  };

  // Delete support entry
  const deleteSupport = (id) => {
    fetch(`http://localhost:5000/supports/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setSupports(supports.filter((support) => support._id !== id));
      });
  };
  // Pagination logic
  const indexOfLastSupport = currentPage * supportsPerPage;
  const indexOfFirstSupport = indexOfLastSupport - supportsPerPage;
  const currentSupports = filterSupportsByDate().slice(
    indexOfFirstSupport,
    indexOfLastSupport
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const PDFDocument = () => (
    
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.title}>Support Panel</Text>
        </View>
        <View style={styles.content}>
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
                <Text>Subcategory</Text>
              </View>
              <View style={styles.tableCellHeader}>
                <Text>Name</Text>
              </View>
              <View style={styles.tableCellHeader}>
                <Text>Number</Text>
              </View>
              <View style={styles.tableCellHeader}>
                <Text>Problem Description</Text>
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
                  <Text
                    onPress={() => handleSubcategoryClick(support.subcategory)}
                    style={styles.clickable}
                  >
                    {support?.softwareCategory
                      ? support.softwareCategory
                      : support.hardwareCategory}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{support.name}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{support.mobileNo}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{support.description}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{support.token}</Text>
                </View>
               
              </View>
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
            fixed
          />
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      paddingTop: 50,
      paddingBottom: 40,
      paddingHorizontal: 40,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 0,
      backgroundColor: "#059669",
      padding: 20,
    },
    title: {
      fontSize: 10,
      color: "white",
    },
    logo: {
      width: 80,
      height: 12,
    },
    content: {
      margin: 0.5,
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 0.4,
      borderColor: "#000",
      marginTop: 0,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 0.4,
      borderColor: "#000",
    },
    tableCellHeader: {
      flex: 1,
      padding: 2,
      borderStyle: "solid",
      borderWidth: 0.4,
      borderColor: "#000",
      backgroundColor: "#f0f0f0",
      fontSize: 8,
    },
    tableCell: {
      flex: 1,
      padding: 2,
      borderStyle: "solid",
      borderWidth: 0.4,
      borderColor: "#000",
      fontSize: 8,
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 12,
    },
    pageNumber: {
      fontWeight: "bold",
    },
  });

  return (
    <div className="mx-auto p-12">
      <div className="overflow-x-hidden w-full mx-auto">
        <div className="bg-emerald-600 rounded-t-lg flex items-center justify-between">
          <h1 className="text-xl mx-6 py-4 text-white">Support Panel</h1>
          <div className="mr-8">
            <img src={logo} className="h-6" alt="" />
          </div>
        </div>

        <table className="table-auto  w-full mx-auto border border-emerald-800">
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
              <th className="border px-4 py-2">Subcategory</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Number</th>
              <th className="border px-4 py-2">Problem Description</th>
              <th className="border px-4 py-2">Token</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="rounded-b-lg">
          {currentSupports.map((support, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{support.serial}</td>
                <td className="border px-4 py-2">
                  {new Date(support.date).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{support.category}</td>
                <td className="border px-4 py-2">
                  {support?.softwareCategory
                    ? support.softwareCategory
                    : support.hardwareCategory}
                </td>
                <td className="border px-4 py-2">{support.name}</td>
                <td className="border px-4 py-2">{support.mobileNo}</td>
                <td className="border px-4 py-2">{support.description}</td>
                <td className="border px-4 py-2">{support.token}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteSupport(support._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         {/* Pagination */}
         <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filterSupportsByDate().length / supportsPerPage) }, (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)} className="mx-1 px-3 py-1 bg-emerald-600 text-white rounded">
              {i + 1}
            </button>
          ))}
          </div>
      </div>
      <div className="flex justify-end mt-4">
        <PDFDownloadLink document={<PDFDocument />} fileName="support_panel.pdf">
          {({ blob, url, loading, error }) =>
            loading ? (
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                Loading Document...
              </button>
            ) : (
              <button className="bg-emerald-600 text-white px-4 py-2 rounded">
                Download PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Support;
