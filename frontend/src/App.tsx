import React from 'react';
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./services/utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <React.Fragment>
      <AuthProvider>

        <Header />
          <Routes>

          <Route path='/' element={<PrivateRoute/>}>
              <Route path='/' element={<HomePage/>}/>
          </Route>

          <Route path="/login" element={<LoginPage />} />
        </Routes>

      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
