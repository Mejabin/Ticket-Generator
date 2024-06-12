import { useState } from "react";
import logo from "../../assets/BAITS-02.png";
import toast, { Toaster } from "react-hot-toast";

const Form = () => {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [token, setToken] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("No file chosen");

  const handleSupportPost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const mobileNo = form.mobile_no.value;
    const category = form.category.value;
    const description = form.description.value;
    const file = form.attachment.files[0];
    const currentDate = new Date().toISOString();
    const newToken = generateToken();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobileNo", mobileNo);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("date", currentDate);
    formData.append("token", newToken);
    if (file) {
      formData.append("attachment", file);
    }

    try {
      setToken(newToken);

      const response = await fetch(
        "https://ticket-generator-server.vercel.app/support-post",
        {
          method: "POST",
          body: formData,
        }
      );

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
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                
                  <rect width="24" height="24" fill="white"></rect>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L11 13.3656L9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z"
                    fill="#059669"
                  ></path>
                </g>
              </svg>
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
        setToken("");
        toast.error(
          `There was an error submitting the form. Please try again.`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionMessage(
        "There was an error submitting the form. Please try again."
      );
      setToken("");
    }
  };

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
                >
                  <option
                    className="text-xs opacity-45"
                    defaultValue=""
                    disabled
                    selected
                    style={{ color: "rgba(0, 0, 0, 0.45)" }}
                  >
                    Select one
                  </option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                </select>
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
                          {" "}
                          <path
                            d="M20 10.9696L11.9628 18.5497C10.9782 19.4783 9.64274 20 8.25028 20C6.85782 20 5.52239 19.4783 4.53777 18.5497C3.55315 17.6211 3 16.3616 3 15.0483C3 13.7351 3.55315 12.4756 4.53777 11.547L12.575 3.96687C13.2314 3.34779 14.1217 3 15.05 3C15.9783 3 16.8686 3.34779 17.525 3.96687C18.1814 4.58595 18.5502 5.4256 18.5502 6.30111C18.5502 7.17662 18.1814 8.01628 17.525 8.63535L9.47904 16.2154C9.15083 16.525 8.70569 16.6989 8.24154 16.6989C7.77738 16.6989 7.33224 16.525 7.00403 16.2154C6.67583 15.9059 6.49144 15.4861 6.49144 15.0483C6.49144 14.6106 6.67583 14.1907 7.00403 13.8812L14.429 6.88674"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
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
                        {" "}
                        <rect
                          x="0"
                          fill="none"
                          width="24"
                          height="24"
                        ></rect>{" "}
                        <g>
                          {" "}
                          <path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path>{" "}
                        </g>{" "}
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
