import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  .field input {
    position: relative;
    display: block;
    width: 100%;
    font-size: ${(props) => props.fontSize};
    line-height: ${(props) => props.fontSize * 2}px;
    font-family: ${(props) => props.fontFace};
    margin-bottom: ${(props) => props.fontSize * 2}px;
    border: none;
    border-bottom: 5px solid rgba(0, 0, 0, 1);
    background: transparent;
    min-width: 250px;
    padding-left: 5px;
    outline: none;
    color: rgba(0, 0, 0, 1);
  }

  .field input:focus {
    border-bottom: 5px solid ${(props) => props.formShadow};
  }
`;

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
    try {
      const response = await fetch(
        "https://backend-db-five.vercel.app/add-tickets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      console.log(JSON.stringify(dataToSend));
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting the form:", error);
      setSubmissionMessage("Error submitting the form. Please try again.");
    }
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
      <div className="static  h-80 w-80 border-solid border-2 border-black bg-[#FFA680] flex items-center justify-center">
        <div className=" absolute  right-  h-80 w-80 border-solid border-2 border-black bg-[#F8F4E5] flex items-center justify-center">
          <StyledForm
            autoComplete="off"
            id="form"
            className="space-y-4 p-4"
            fontSize="16px"
            fontFace="Arial, sans-serif"
            formBg="#FFF"
            formShadow="rgba(0, 0, 0, 0.5)"
          >
            <h1 className="text-2xl mb-1.5" id="message">
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
              />
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
              />
              <small
                id="emailMessage"
                className="block text-xs text-gray-600"
              ></small>
            </div>
            <div className="field space-y-1">
              <input
                type="tel"
                name="phone"
                placeholder="Phone (e.g.,+880********)"
                id="phone"
                autoComplete="off"
                pattern="+880********"
                value={formData.phone}
                onChange={handleChange}
              />
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
          </StyledForm>
        </div>
      </div>
    </div>
  );
};

export default Form;
