import { useEffect, useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [token, setToken] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const backgroundImageUrl =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg";

  useEffect(() => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const submitBtn = document.getElementById("submit");

    function formValidation() {
      name.addEventListener("input", () => {
        document.getElementById("nameMessage").innerHTML = "Type your Name";
      });
      email.addEventListener("input", () => {
        document.getElementById("emailMessage").innerHTML = "Enter your Email";
      });
      phone.addEventListener("input", () => {
        document.getElementById("phoneMessage").innerHTML = "Enter your Phone";
      });

      submitBtn.addEventListener("click", () => {
        document.getElementById("message").innerHTML = "Drop Your Details";
        document.getElementById("smallMessage").innerHTML =
          "Let us know your problems";
      });
    }

    formValidation();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateToken = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = async () => {
    const newToken = generateToken();
    setToken(newToken);
    setSubmissionMessage("Thank You! Your token number is:");

    const currentTime = new Date().toLocaleString();
    const dataToSend = { ...formData, token: newToken, time: currentTime };
    console.log(dataToSend);
    // Here you can add your fetch logic
  };

  return (
    <div
      className="flex items-center justify-center w-screen h-screen"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="h-80 w-80 border-solid border-2 border-black bg-[#F8F4E5] flex items-center justify-center">
        <form autoComplete="off" id="form" className="space-y-4 p-4">
          <h1 className="2xl" id="message">
            Drop Your Information
          </h1>
          <small id="smallMessage"></small>
          <div className="field space-y-1">
            <input
              type="text"
              name="name"
              placeholder="Name"
              id="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label htmlFor="name" className="block text-sm text-gray-600">
              Name
            </label>
            <small
              id="nameMessage"
              className="block text-xs text-gray-500"
            ></small>
          </div>
          <div className="field space-y-1">
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <small
              id="emailMessage"
              className="block text-xs text-gray-500"
            ></small>
          </div>
          <div className="field space-y-1">
            <input
              type="tel"
              name="phone"
              placeholder="Phone (e.g., 123-456-7890)"
              id="phone"
              autoComplete="off"
              pattern="+880********"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label htmlFor="phone" className="block text-sm text-gray-600">
              Phone
            </label>
            <small
              id="phoneMessage"
              className="block text-xs text-gray-500"
            ></small>
          </div>
          <button
            id="submit"
            type="button"
            onClick={handleSubmit}
            className="
    block 
    mx-auto 
    p-2 
    bg-form-shadow 
    leading-8 
    px-5 
    transition-all 
    ease-in-out 
    outline-none 
    border 
    border-black 
    shadow-lg 
    hover:bg-black 
    hover:text-white 
    hover:border-black"
          >
            Submit
          </button>

          {submissionMessage && (
            <div className="mt-4 text-center">
              <p>{submissionMessage}</p>
              {token && <p>Token Number: {token}</p>}
            </div>
          )}
          <p className="text-xs text-gray-500">
            We&apos;ll shortly reach you 
          </p>
        </form>
      </div>
    </div>
  );
};

export default Form;
