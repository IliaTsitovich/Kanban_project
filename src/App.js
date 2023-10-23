import React, { useState } from "react";
import Header from "./components/Header/Header";
import MainPage from "./components/Main-page/main-page";
import { Context } from "./context";
import "./index.scss";

function App() {

  const [name, setName] = useState();

  return (
    <>
    <Header/>
          <div className="container__Blocks">
            <Context.Provider value={{name,setName}}>
              <MainPage/>
            </Context.Provider>       
          </div>
    </>
  );
}

export default App;
