import "./App.css";
import Main from "./components/Main";
import React, { useState, useEffect } from "react";
import { languageDir, languageFont } from "./general";

export const AppContext = React.createContext();

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const lang = "persian";
  const langDir = languageDir(lang);
  const langFont = languageFont(lang);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <div>
      <AppContext.Provider value={{ lang, langDir, langFont, isMobile }}>
        <Main />
      </AppContext.Provider>
    </div>
  );
}

export default App;
