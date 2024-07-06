import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DataGridDemo from "./components/GridDemo";
import { ConfirmProvider } from "material-ui-confirm";
function App() {
  return (
    <div className="App">
      <h1>CRUD with MUI Grid</h1>
      <ConfirmProvider>
        <DataGridDemo />
      </ConfirmProvider>
    </div>
  );
}

export default App;
