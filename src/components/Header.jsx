import { FiUser, FiSearch, FiBell, FiMoon, FiSun } from "react-icons/fi";

const Header = ({ darkMode, sidebarOpen }) => {
  return (
    <header
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm p-4 flex items-center flex-row-reverse justify-between`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <FiUser />
          </div>
          {sidebarOpen && <span>Admin</span>}
        </div>
      </div>
    </header>
  );
};

export default Header;
