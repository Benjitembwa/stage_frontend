import { useEffect, useState } from "react";
import {
  FiHome,
  FiFile,
  FiClock,
  FiArchive,
  FiPieChart,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";

// Enregistrement des composants ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

import Sidebar from "../components/Sidebar";
import DashboardTab from "../components/DashboardTab";
import DocumentsTab from "../components/DocumentsTab";
import RequestsTab from "../components/RequestsTab";
import StatsTab from "../components/StatsTab";
import UsersTab from "../components/UsersTab";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [documentRequests, setDocumentRequests] = useState([
    {
      id: 1,
      student: "Jean Dupont",
      type: "Relevé de notes",
      date: "2023-05-15",
      status: "pending",
    },
    {
      id: 2,
      student: "Marie Martin",
      type: "Attestation de scolarité",
      date: "2023-05-14",
      status: "pending",
    },
    {
      id: 3,
      student: "Pierre Lambert",
      type: "Diplôme",
      date: "2023-05-13",
      status: "approved",
    },
  ]);
  const navigate = useNavigate();

  const handleRequestAction = (id, action) => {
    setDocumentRequests((requests) =>
      requests.map((request) =>
        request.id === id ? { ...request, status: action } : request
      )
    );
  };

  const navItems = [
    { icon: <FiHome />, label: "Tableau de bord", id: "dashboard" },
    { icon: <FiFile />, label: "Gestion documents", id: "documents" },
    { icon: <FiClock />, label: "Demandes en attente", id: "requests" },
    { icon: <FiPieChart />, label: "Statistiques", id: "stats" },
    {
      icon: <FiUsers />,
      label: "Gestion des utilisateurs",
      id: "users",
    },
  ];

  const [facultyFilter, setFacultyFilter] = useState("");
  const [promotionFilter, setPromotionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUtilisateur(parsedUser);
        console.log(parsedUser);
      } catch (err) {
        console.error("Erreur de parsing JSON :", err);
        navigate("/connexion");
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans le localStorage");
      navigate("/connexion");
    }
  }, [navigate]);

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Sidebar */}

      <Sidebar
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-sm p-4 flex items-center flex-row-reverse justify-between`}
        >
          <div className="flex  items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <FiUser />
              </div>
              {sidebarOpen && <span>Admin</span>}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === "dashboard" && (
            <DashboardTab
              darkMode={darkMode}
              documentRequests={documentRequests}
            />
          )}

          {activeTab === "documents" && <DocumentsTab darkMode={darkMode} />}

          {activeTab === "requests" && (
            <RequestsTab
              darkMode={darkMode}
              documentRequests={documentRequests}
              handleRequestAction={handleRequestAction}
            />
          )}

          {activeTab === "archives" && <ArchivesTab darkMode={darkMode} />}

          {activeTab === "stats" && <StatsTab darkMode={darkMode} />}

          {activeTab === "users" && (
            <UsersTab
              darkMode={darkMode}
              facultyFilter={facultyFilter}
              setFacultyFilter={setFacultyFilter}
              promotionFilter={promotionFilter}
              setPromotionFilter={setPromotionFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
