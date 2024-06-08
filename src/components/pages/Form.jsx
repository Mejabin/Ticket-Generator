import { useEffect, useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  useEffect(() => {
    const message = document.getElementById("message");
    const smallMessage = document.getElementById("smallMessage");
    const emailMessage = "Type your email";
    const passwordMessage = "Choose your password";
    const name = document.getElementById("name");
    const mobile = document.getElementById("mobile");
    const submitBtn = document.getElementById("submit");

    function firstMessage() {
      message.innerHTML = emailMessage;
      smallMessage.innerHTML = "";
      document.body.style.background = "#88C9E8";
    }

    function secondMessage() {
      message.innerHTML = passwordMessage;
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
        message.innerHTML = "You're a click away";
        smallMessage.innerHTML = "Do it. That's what you are here for.";
        document.body.style.background = "#FCEFA6";
      });
    }

    formValidation();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/ticket", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  return (
    <div className="container">
      <form autoComplete="off" id="form" onSubmit={handleSubmit}>
        <h1 id="message">Get Started</h1>
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
          Submit
        </button>
        <p>By signing up, I agree to the Terms of Service and Privacy Policy</p>
      </form>
    </div>
  );
};

export default Form;
