import { useEffect, useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  const [token, setToken] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    const message = document.getElementById("message");
    const smallMessage = document.getElementById("smallMessage");
    const nameMessage = "Type your Name";
    const numberMessage = "Enter your Number";
    const name = document.getElementById("name");
    const mobile = document.getElementById("mobile");
    const submitBtn = document.getElementById("submit");

    function firstMessage() {
      message.innerHTML = nameMessage;
      smallMessage.innerHTML = "";
      document.body.style.background = "#88C9E8";
    }

    function secondMessage() {
      message.innerHTML = numberMessage;
      document.body.style.background = "#D5F3A6";
    }

    function length() {
      if (mobile.value.length <= 10) {
        smallMessage.innerHTML = "Enter a valid mobile number";
      } else {
        smallMessage.innerHTML = "";
      }
    }

    function formValidation() {
      name.addEventListener("input", firstMessage);
      mobile.addEventListener("input", secondMessage);
      mobile.addEventListener("keyup", length);

      submitBtn.addEventListener("mouseover", function () {
        message.innerHTML = "Drop Your Name & Number";
        smallMessage.innerHTML = "let us know your problems";
        document.body.style.background = "#FCEFA6";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newToken = generateToken();
    setToken(newToken);
    setSubmissionMessage("Thank You!  Your token number is:");

    const dataToSend = { ...formData, token: newToken };

    try {
      const response = await fetch("http://localhost:5000/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting the form:", error);
      setSubmissionMessage("Error submitting the form. Please try again.");
    }
  };

  return (
    <div className="container">
      <form autoComplete="off" id="form" onSubmit={handleSubmit}>
        <h1 id="message">Drop Your Name & Number</h1>
        <small id="smallMessage"></small>
        <div className="field">
          <input
            type="text"
            name="name"
            placeholder="Name"
            id="name"
            autoComplete="off"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="field">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile No. (e.g., +8801XXXXXXXXX)"
            id="mobile"
            autoComplete="off"
            value={formData.mobile}
            onChange={handleChange}
          />
          <label htmlFor="mobile">Mobile Number</label>
        </div>
        <button id="submit" type="submit">
          {submissionMessage && (
            <div>
              <p>{submissionMessage}</p>
              {token && <p>Token Number: {token}</p>}
            </div>
          )}
          Submit
        </button>
        <p>By signing up, I agree to the Terms of Service and Privacy Policy</p>
      </form>
    </div>
  );
};

export default Form;
