import { useState } from "react";
import logo from "../../assets/BAITS-02.png";
import toast, { Toaster } from "react-hot-toast";

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("No file chosen");
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedHardwareCategories([]); // Clear selected hardware categories on category change
    setSelectedSoftwareCategories([]); // Clear selected software categories on category change
  };

  const handleHardwareCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedHardwareCategories([...selectedHardwareCategories, value]);
    } else {
      setSelectedHardwareCategories(selectedHardwareCategories.filter((item) => item !== value));
    }
  };

  const handleSoftwareCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSoftwareCategories([...selectedSoftwareCategories, value]);
    } else {
      setSelectedSoftwareCategories(selectedSoftwareCategories.filter((item) => item !== value));
    }
  };

  return (
    <section className="container mx-auto p-12 h-screen flex items-center justify-center flex-nowrap">
      <Toaster />
      <div className="sm:mt-8 md:mt-3">
        <div className="flex items-center justify-center mb-8">
          <img src={logo} className="h-12" alt="" />
        </div>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl shadow-emerald-800/35 pt-0">
          <div className="bg-emerald-600 rounded-t-lg">
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
                  className="min-w-80 w-full px-4 py-3 border rounded-md text-black placeholder:text-sm"
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
                  className="min-w-80 w-full px-4 py-3 border rounded-md text-black placeholder:text-sm"
                  required
                />
              </div>
              <div className="">
                <label className="block text-black/50 text-xs uppercase font-bold mb-2">
                  Select a category
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-md text-black"
                  name="category"
                  required
                  onChange={handleCategoryChange}
                >
                  <option
                    className="text-xs opacity-45"
                    value=""
                    disabled
                    selected
                    style={{ color: "rgba(0, 0, 0, 0.45)" }}
                  >
                    Select one
                  </option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                </select>

                {selectedCategory === "Hardware" && (
                  <div className="mt-4">
                    <label className="block text-black/50 text-xs uppercase font-bold mb-2">
                      Hardware Category
                    </label>
                    {hardwareOptions.map((option) => (
                      <div key={option}>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            value={option}
                            checked={selectedHardwareCategories.includes(option)}
                            onChange={handleHardwareCategoryChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                {selectedCategory === "Software" && (
                  <div className="mt-4">
                    <label className="block text-black/50 text-xs uppercase font-bold mb-2">
                      Software Category
                    </label>
                    {softwareOptions.map((option) => (
                      <div key={option}>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            value={option}
                            checked={selectedSoftwareCategories.includes(option)}
                            onChange={handleSoftwareCategoryChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-black/50 text-xs uppercase font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  placeholder="Enter a description"
                  name="description"
                  className="w-full px-4 py-3 border  text-black placeholder:text-sm rounded-md "
                  rows="4"
                  required
                />
              </div>
              <div className="mt-3">
                <label
                  htmlFor="fileInput"
                  className="block text-black/50 text-xs uppercase font-bold mb-2"
                >
                  Attach File
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="fileInput"
                    name="attachment"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="fileInput"
                    className="w-full border-2 border-dashed  p-3 input-primary mt-2 cursor-pointer flex items-center gap-2 rounded-md opacity-60 text-sm"
                  >
                    <span>
                      <svg
                        width="20px"
                        height="20px"
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
                          <path
                            d="M20 10.9696L11.9628 18.5497C10.9782 19.4783 9.64274 20 8.25028 20C6.85782 20 5.52239 19.4783 4.53777 18.5497C3.55315 17.6211 3 16.3616 3 15.0483C3 13.7351 3.55315 12.4756 4.53777 11.547L12.575 3.96687C13.2314 3.34779 14.1217 3 15.05 3C15.9783 3 16.8686 3.34779 17.525 3.96687C18.1814 4.58595 18.5502 5.4256 18.5502 6.30111C18.5502 7.17662 18.1814 8.01628 17.525 8.63535L9.47904 16.2154C9.15083 16.525 8.70569 16.6989 8.24154 16.6989C7.77738 16.6989 7.33224 16.525 7.00403 16.2154C6.67583 15.9059 6.49144 15.4861 6.49144 15.0483C6.49144 14.6106 6.67583 14.1907 7.00403 13.8812L14.429 6.88674"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <span>{selectedFileName.slice(0, 40)}.</span>
                  </label>
                </div>
              </div>
              <div className="mt-8">
                <button
                  className="w-full bg-emerald-600 text-white px-4 py-3 rounded-md hover:bg-emerald-700 shadow-md shadow-emerald-800/25 font-semibold"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="">
          {token && (
            <div className="mt-14 bg-white max-w-md mx-auto rounded-lg grid grid-cols-8">
              <div className="col-span-1 border-e-2 border-dashed token-dot"></div>
              <div className="col-span-7 px-4 ps-8 py-4 flex items-center justify-between">
                <div className="">
                  <p className="text-xs opacity-60">Your Token Number: </p>
                  <p className="text-3xl uppercase font-bold">{token}</p>
                </div>
                <button
                  className="text-black"
                  onClick={() => {
                    setToken("");
                    setSubmissionMessage("");
                  }}
                >
                  <span>
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <rect x="0" fill="none" width="24" height="24"></rect>
                        <g>
                          <path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path>
                        </g>
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Form;
