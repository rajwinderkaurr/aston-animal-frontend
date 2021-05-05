import React from "react";
import Header from './components/headers/Header'
import Footer from './components/footers/Footer'
import DataProvider from './GlobalState'
import MainPages from './components/mainpages/MainPages'

import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <DataProvider className="app">
      <Router>
        <Header />
        <MainPages />
        <Footer />
      </Router>
    </DataProvider>
  );
}

export default App;
