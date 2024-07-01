import { useState } from "react";
import logo from "../../assets/BAITS-02.png";
import toast, { Toaster } from "react-hot-toast";
import Hardware from "./Hardware";
import Software from "./Software";

const Form = () => {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [token, setToken] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("No file chosen");
  const [selectedHardwareCategories, setSelectedHardwareCategories] = useState([]);
  const [selectedSoftwareCategories, setSelectedSoftwareCategories] = useState([]);

  const handleSupportPost = async (e) => {
    e.preventDefault();
    const newToken = generateToken();
    const form = e.target;
    const name = form.name.value;
    const mobileNo = form.mobile_no.value;
    const category = form.category.value;
    const hardwareCategory = selectedHardwareCategories.join(', ');
    const softwareCategory = selectedSoftwareCategories.join(', ');
    const description = form.description.value;
    const file = form.attachment.files[0];
    const currentDate = new Date().toISOString();

    const formData = {
      name,
      mobileNo,
      category,
      hardwareCategory,
      softwareCategory,
      description,
      date: currentDate,
      attachment: file ? file : " ",
      token: newToken
    };
    console.log({ formData });
    try {
      setToken(newToken);
      // data post
      const response = await fetch(
        "https://ticket-generator-server.vercel.app/support-post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.success) {
        toast.custom(
          <div className="flex items-center gap-3 py-4 px-4 shadow-xl rounded-xl shadow-emerald-800/25 text-sm bg-white">
            <span>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </span>
            <p className="">{`Thank you! Your data was submitted successfully. Your token number is: ${newToken}`}</p>
          </div>
        );

        setToken(newToken);
        form.reset();
        setSelectedFileName("No file chosen");
      } else {
        setSubmissionMessage(
          "There was an error submitting the form. Please try again."
        );
        toast.error(
          `There was an error submitting the form. Please try again.`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionMessage(
        "There was an error submitting the form. Please try again."
      );
    }
  };

  const hardwareOptions = [
    'Fire Safety and Fire Protection Solutions',
    'CCTV Surveillance Systems',
    'Time Attendance Systems',
    'Burglar Alarm System',
    'Car Parking Management System',
    'Baggage Scanner',
    'Archway Gate and Metal Detector',
    'Car GPS Tracking System',
    'IP-Based Intercom & PABX Systems',
    'Face Recognition CCTV Solution',
    'Home Automation Solution',
    'Networking Solutions',
    'Conference System',
    'Guarding Beyond Boundaries',
    'Solar System',
  ];

  const softwareOptions = [
    'NEDUBD',
    'BProfile',
    'BAMS',
    'Others',
  ];

  const generateToken = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newToken = "";
    for (let i = 0; i < 5; i++) {
      newToken += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return newToken;
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFileName(file.name);
  //   } else {
  //     setSelectedFileName("No file chosen");
  //   }
  // };

  return (
    <section className="container mx-auto p-12 h-screen flex items-center justify-center flex-nowrap">
      <Toaster />
      <div className="sm:mt-8 md:mt-3">
        <div className="flex items-center justify-center mb-8">
          <img src={logo} className="h-12" alt="" />
        </div>
        {/* icons for Hardware */}
        <div className="relative">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl shadow-emerald-800/35  pt-0">
            <div className=" bg-emerald-600 rounded-t-lg">
              <h1 className="text-xl mb-6 py-4 px-10 text-white">
                Support Portal
              </h1>
            </div>
            <div className="px-8 py-10 pt-4">
              <form onSubmit={handleSupportPost} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-black/50 text-xs uppercase font-bold mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    className="w-80 px-4 py-3 border rounded text-black placeholder:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="mobile_no"
                    className="block text-black/50 text-xs uppercase font-bold mb-2"
                  >
                    Your Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    name="mobile_no"
                    className="w-80 px-4 py-3 border rounded text-black placeholder:text-sm"
                    required
                  />
                </div>
                <div className="">
                  <label className="block text-black/50 text-xs uppercase font-bold mb-2">
                    Select a category
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded text-black"
                    name="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    required
                  >
                    <option
                      className="text-xs opacity-45"
                      value=""
                      disabled
                      style={{ color: "rgba(0, 0, 0, 0.45)" }}
                    >
                      Select one
                    </option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                  </select>

                  {/* Display Hardware component if "Hardware" is selected */}
                  {selectedCategory === "Hardware" && <Hardware />}
                  {selectedCategory === "Software" && <Software />}

                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-black/50 text-xs uppercase font-bold mb-2"
                  >
                    Description
                  </label>

                  <textarea
                    placeholder="Describe your problem here..."
                    name="description"
                    rows="4"
                    className="w-full px-4 py-3 border rounded text-black placeholder:text-sm"
                    required
                  />
                </div>
                <div className="mt-8">
                  <button
                    className="w-full bg-emerald-600 text-white px-4 py-3 rounded hover:bg-emerald-700 shadow-md shadow-emerald-800/25 font-semibold"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          
         
        </div>
      </div>
      <div className="">
        {/* Display token and reset button if token exists */}
        {token && (
          <div className="mt-14 bg-white max-w-md mx-auto rounded-lg grid grid-cols-8">
            <div className="col-span-1 border-e-2 border-dashed token-dot"></div>
            <div className="col-span-7 px-4 ps-8 py-4 flex items-center justify-between">
              <div className="">
                <p className="text-xs opacity-60">Your Token Number: </p>
                <p className="text-3xl uppercase font-bold">{token}</p>
              </div>
              <button
                className=" text-black "
                onClick={() => {
                  setToken("");
                  setSubmissionMessage("");
                }}
              ></button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Form;
