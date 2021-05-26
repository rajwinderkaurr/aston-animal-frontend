import React from "react";
import Header from './components/headers/Header'
import Footer from './components/footers/Footer'
import DataProvider from './GlobalState'
import MainPages from './components/mainpages/MainPages'
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <DataProvider className="app">  
      <ToastProvider>
        <Router>
          <Header />
          <MainPages />
          <Footer />
        </Router>
      </ToastProvider>
    </DataProvider>
  );
}

export default App;
