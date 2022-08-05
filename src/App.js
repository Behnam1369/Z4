import "./App.css";
import Main from "./components/Main";
import React from "react";
import { languageDir } from "./general";

export const AppContext = React.createContext();

function App() {
  const lang = "turkish";
  const langDir = languageDir(lang);
  return (
    <div>
      <AppContext.Provider value={{ lang, langDir }}>
        <Main />
      </AppContext.Provider>
    </div>
  );
}

export default App;
