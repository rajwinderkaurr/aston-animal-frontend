import React from "react";
import Header from './components/headers/Header'
import DataProvider from './GlobalState'

function App() {
  return (
    <DataProvider className="app">
      <Header />
    </DataProvider>
  );
}

export default App;
