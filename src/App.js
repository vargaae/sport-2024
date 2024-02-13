import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { HomePage, CompetitionPage, EventPage } from "./pages";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/:id" element={<CompetitionPage />} />
        <Route path="/:id/:id" element={<EventPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
