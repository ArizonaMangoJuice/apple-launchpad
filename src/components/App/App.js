import React from "react";
import "./App.css";

const App = ({ name, icon }) => {
  return (
    <div className="app-block">
      <img className="app-image" src={require(`../../images/${icon}`)} alt="" />
      <p className="app-name">{name}</p>
    </div>
  );
};

export default App;
