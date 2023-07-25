import React from "react";
import Header from "./components/Header/Header";
import MainPage from "./components/Main-page/main-page";
import "./index.scss";

function App() {
  return (
    <>
         <Header/>
          <div className="container__Blocks">
            <MainPage/>
          </div>
    </>       
  );
}

export default App;
