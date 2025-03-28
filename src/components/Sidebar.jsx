import { useState, useEffect } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiSun,
  FiMoon,
  FiX,
  FiMenu,
} from "react-icons/fi";

const Sidebar = ({ navItems, activeTab, setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Bouton hamburger pour mobile */}
      {isMobile && !sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className={`fixed z-40 left-4 top-4 p-2 rounded-md ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } shadow-lg transition-all duration-200 hover:scale-105`}
        >
          <FiMenu className="text-xl" />
        </button>
      )}

      {/* Overlay léger et transparent */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-opacity-20 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 h-screen ${
          sidebarOpen ? "w-64" : "w-20"
        } ${
          darkMode ? "bg-gray-900" : "bg-white"
        } transition-all duration-300 ease-in-out shadow-xl flex flex-col ${
          isMobile && !sidebarOpen
            ? "-translate-x-full md:translate-x-0"
            : "translate-x-0"
        }`}
      >
        {/* Header de la sidebar */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
              EduDoc Admin
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {sidebarOpen ? (
              isMobile ? (
                <FiX className="text-lg" />
              ) : (
                <FiChevronDown className="text-lg" />
              )
            ) : (
              <FiChevronRight className="text-lg" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {sidebarOpen && (
                    <span className="ml-3 whitespace-nowrap">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
