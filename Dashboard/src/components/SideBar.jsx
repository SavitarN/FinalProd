import React from "react";
import {
  Menu,
  ChevronLeft,
  LayoutGrid,
  PieChart,
  Users,
  Briefcase,
  Database,
  FileText,
  ChartBar,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to track current active path

  // Vibrant Royal Blue Palette from reference image
  const colors = {
    royalBlue: "#1E3A8A",
    electricBlue: "#60A5FA",
    peach: "#FFD0B5",
    glassBorder: "rgba(255, 255, 255, 0.15)",
    glassBg: "rgba(255, 255, 255, 0.08)",
  };

  const menuItems = [
    { name: "Overview", icon: <LayoutGrid size={20} />, path: "/" },
    { name: "Roadmap Tracker", icon: <PieChart size={20} />, path: "/map" },
    {
      name: "Partners Dashboard",
      icon: <Users size={20} />,
      path: "/partners",
    },
    {
      name: "Service Providers Dashboard",
      icon: <Briefcase size={20} />,
      path: "/serviceDashboard",
    },
    {
      name: "Research and Exploration",
      icon: <Database size={20} />,
      path: "/research",
    },
    { name: "Downloads", icon: <FileText size={20} />, path: "/downloads" },
    { name: "Chart", icon: <ChartBar size={20} />, path: "/chart" },
  ];

  return (
    <>
      {/* TRIGGER BUTTON: Glass style */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-8 left-8 z-[999] p-4 rounded-2xl shadow-2xl text-white backdrop-blur-xl border transition-all duration-300 hover:scale-110 hover:bg-white/10 active:scale-95"
          style={{
            backgroundColor: colors.glassBg,
            borderColor: colors.glassBorder,
          }}
        >
          <Menu size={24} />
        </button>
      )}

      {/* THE SIDEBAR CONTAINER */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.23, 1, 0.32, 1)] lg:sticky lg:top-0 lg:h-screen flex flex-col overflow-hidden border-r backdrop-blur-2xl ${
          isOpen
            ? "w-80 p-8 opacity-100 shadow-[20px_0_60px_rgba(0,0,0,0.15)]"
            : "w-0 p-0 opacity-0 -translate-x-full lg:translate-x-0"
        }`}
        style={{
          backgroundColor: "rgba(30, 58, 138, 0.95)",
          borderColor: colors.glassBorder,
        }}
      >
        <div className="flex flex-col h-full relative min-w-[260px]">
          {/* LOGO SECTION */}
          <div className="flex flex-col mb-16 px-2">
            <div className="flex items-center justify-between">
              <h1
                className="text-white text-2xl font-black tracking-tight cursor-pointer leading-tight transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => navigate("/")}
              >
                Service Regulation
                <br />
                <span className="text-blue-300 font-bold opacity-80">2082</span>
              </h1>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="space-y-2 flex-1 overflow-y-auto no-scrollbar pr-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <div
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={`group flex items-center gap-4 py-3.5 px-5 rounded-2xl cursor-pointer transition-all duration-300 border ease-out
                    ${
                      isActive
                        ? "bg-white/15 text-white shadow-lg border-white/10 scale-[1.02]"
                        : "text-blue-100/60 hover:bg-white/10 hover:text-white border-transparent hover:translate-x-1"
                    }`}
                >
                  <div
                    className={`${
                      isActive ? "text-blue-300" : "group-hover:text-blue-300"
                    } transition-colors duration-300`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold tracking-wide">
                    {item.name}
                  </span>

                  {/* Dynamic Indicator: Now follows the active state */}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-tr from-orange-300 to-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.6)] animate-in fade-in zoom-in duration-500"></div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* MODERN GLASS OVERLAY FOR MOBILE */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
