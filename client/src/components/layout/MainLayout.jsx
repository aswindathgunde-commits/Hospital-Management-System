import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar.jsx";
import Navbar from "./Navbar/Navbar.jsx";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="app-main">

        <Navbar
          onMenuClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <div className="app-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default MainLayout;