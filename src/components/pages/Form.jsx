import { useEffect } from "react";
import { Link } from "react-router-dom";

const themes = [
  {
    background: "#1A1A2E",
    color: "#FFFFFF",
    primaryColor: "#0F3460",
  },
  {
    background: "#461220",
    color: "#FFFFFF",
    primaryColor: "#E94560",
  },
  {
    background: "#192A51",
    color: "#FFFFFF",
    primaryColor: "#967AA1",
  },
  {
    background: "#F7B267",
    color: "#000000",
    primaryColor: "#F4845F",
  },
  {
    background: "#F25F5C",
    color: "#000000",
    primaryColor: "#642B36",
  },
  {
    background: "#231F20",
    color: "#FFF",
    primaryColor: "#BB4430",
  },
];

const setTheme = (theme) => {
  const root = document.querySelector(":root");
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--color", theme.color);
  root.style.setProperty("--primary-color", theme.primaryColor);
};

const Form = () => {
  useEffect(() => {
    displayThemeButtons();
  }, []);

  const displayThemeButtons = () => {
    const btnContainer = document.querySelector(".theme-btn-container");
    themes.forEach((theme) => {
      const div = document.createElement("div");
      div.className = "theme-btn";
      div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px; margin: 5px; cursor: pointer;`;
      btnContainer.appendChild(div);
      div.addEventListener("click", () => setTheme(theme));
    });
  };

  return (
    <section className="container mx-auto p-4">
      <div className="login-container relative bg-white rounded-lg shadow-lg p-8">
        <div className="circle circle-one absolute w-24 h-24 bg-gray-200 rounded-full"></div>
        <div className="form-container w-full max-w-md mx-auto">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="illustration w-full mb-6"
          />
          <h1 className="opacity text-2xl font-bold mb-4">LOGIN</h1>
          <form className="space-y-6">
            <div className="mb-2">
              <label
                htmlFor="userId"
                className="block text-white font-bold text-start"
              >
                Your Name
              </label>
              <input
                type="number"
                placeholder="Please Enter Your Phone Number"
                min="1"
                max="100"
                step="1"
                className="text-white w-full px-4 py-2 border-4 border-gray-300 rounded"
              />
            </div>
            <input
              type="password"
              placeholder="PASSWORD"
              className="text-whitew-full px-4 py-2 border-4 border-gray-300 rounded"
            />
            <button className="opacity w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              SUBMIT
            </button>
          </form>
          <div className="register-forget opacity flex justify-between mt-4">
            <Link to="/" className="text-blue-500 hover:underline">
              FORGOT PASSWORD
            </Link>
          </div>
        </div>
        <div className="circle circle-two absolute w-24 h-24 bg-gray-200 rounded-full"></div>
      </div>
      <div className="theme-btn-container flex justify-center mt-8"></div>
    </section>
  );
};

export default Form;