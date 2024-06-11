import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const System = () => {
  const [supports, setSupports] = useState([]);

  useEffect(() => {
    fetch("https://backend-db-five.vercel.app/all-tickets")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setSupports(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("Tickets", 20, 10);
      doc.autoTable({
        head: [["Name", "Mobile", "Token", "Time"]],
        body: supports.map((support) => [
          support.name,
          support.mobile,
          support.token,
          support.time,
        ]),
        startY: 20,
      });
      doc.save("tickets.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <div className="container mx-auto p-4">
        <h2 className="text-4xl text-center mb-4 text-purple-500">Tickets</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-purple-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Mobile</th>
                <th className="py-2 px-4 border-b">Token</th>
                <th className="py-2 px-4 border-b">Time</th>
              </tr>
            </thead>
            <tbody>
              {supports.map((support, i) => (
                <tr key={i}>
                  <td className="py-2 px-4 border-b">{support.name}</td>
                  <td className="py-2 px-4 border-b">{support.mobile}</td>
                  <td className="py-2 px-4 border-b">{support.token}</td>
                  <td className="py-2 px-4 border-b">{support.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default System;
