import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { PropProvider } from "./contexts/props-context";

function App() {
  const [mode, setMode] = useState("light"); //whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#0d1321";
      document.body.style.color = "white";
      showAlert("Dark Mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      showAlert("Light Mode has been enabled", "success");
    }
  };

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <PropProvider value={{ mode, toggleMode, title: "TextUtils" }}>
        <Navbar />
        <Alert alert={alert} />
        <Outlet />
      </PropProvider>
    </>
  );
}

export default App;
