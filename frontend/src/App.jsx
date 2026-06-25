import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ProjectDetails from "./components/ProjectDetails";
import Admin from "./components/admin/Admin";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-[#E5E7EB] flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <Navbar />

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          {/* Admin is intentionally NOT in the Navbar - only you should know this URL */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}
