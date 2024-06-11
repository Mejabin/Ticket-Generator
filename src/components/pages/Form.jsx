import { useState } from "react";

const Form = () => {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [token, setToken] = useState("");

  const handleSupportPost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const mobileNo = form.mobile_no.value;
    const category = form.category.value;
    const currentDate = new Date().toISOString();
    const newToken = generateToken();

    console.log(token);

    //post method
    const data = {
      mobileNo,
      category,
      date: currentDate,
      token: newToken,
    };
    try {
      setToken(newToken);

      const response = await fetch("http://localhost:5000/support-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Set the alert message with token at the top of the form
        window.alert(
          `Thank you! Your data was submitted successfully. Your token number is: ${newToken}`
        );
        // Set the token in the state
        setToken(newToken);
        // Reset the form
        form.reset();
      } else {
        setSubmissionMessage(
          "There was an error submitting the form. Please try again."
        );
        setToken("");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionMessage(
        "There was an error submitting the form. Please try again."
      );
      setToken("");
    }
  };

  // Function to generate a random token
  const generateToken = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newToken = "";
    for (let i = 0; i < 5; i++) {
      newToken += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return newToken;
  };

  return (
    <section className="container mx-auto p-12 mt-32 h-[90vh]  overflow-hidden ">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-2xl shadow-emerald-800/45  pt-0">
        <div className=" bg-emerald-600 rounded-t-lg">
          <h1 className="text-xl mb-6 py-4 px-10 text-white">
            Send us a message
          </h1>
        </div>
        <div className="px-8 py-10 pt-4">
          <form onSubmit={handleSupportPost} className="space-y-6">
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
                className="w-full px-4 py-3 border rounded text-black placeholder:text-sm"
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
                required
              >
                <option
                  className="opacity-25 disabled:opacity-35"
                  value=""
                  disabled
                  selected
                >
                  Select one
                </option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
              </select>
            </div>
            <div className="mt-8">
              <button
                className="w-full bg-emerald-600 text-white px-4 py-3 rounded hover:bg-emerald-700 shadow-md shadow-emerald-800/25"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          {/* Display token and reset button if token exists */}
          {token && (
            <div className="mt-4 text-center">
              <p>Token Number: {token}</p>
              <button
                className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-900 mt-2"
                onClick={() => {
                  setToken("");
                  setSubmissionMessage("");
                }}
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Form;
