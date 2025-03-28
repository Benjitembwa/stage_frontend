import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importez vos composants de page
import AdminDashboard from "./pages/AdminDashboard";
import Connexion from "./pages/Connexion";
import DocumentVerification from "./pages/DocumentVerification";
import DocumentRequestSystem from "./pages/DocumentRequestSystem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />

        <Route path="/" element={<AdminDashboard />} />

        <Route path="/verification" element={<DocumentVerification />} />

        <Route path="/demande" element={<DocumentRequestSystem />} />
      </Routes>
    </Router>
  );
}

export default App;
